import React from "react";
import { Image } from "react-konva";

export class URLImage extends React.Component {
  state = {
    image: null,
    width: null,
    height: null,
    displayWidth: null,
    displayHeight: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
    if (
      oldProps.maxWidth !== this.props.maxWidth ||
      oldProps.maxHeight !== this.props.maxHeight
    ) {
      this.handleLoad({ target: this.state.image, type: "rotating" });
    }
    if (oldProps.crop !== this.props.crop) {
      this.changeImagePerspective(this.props.rotation);
    }
    if (oldProps.rotationBy90 !== this.props.rotationBy90) {
      this.rotateClockwise();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    let imageSrc = this.props.src;
    if (this.props.src[0] === "/") {
      imageSrc = `file://${this.props.src}`;
    }
    this.image = new window.Image();
    this.image.crossOrigin = "anonymous";
    this.image.src = imageSrc;
    this.image.addEventListener("load", this.handleLoad);
  }
  handleLoad = ({ target: img, type = null }) => {
    const displayDimensions = this.calculateDisplayHeight({
      width: img.width,
      height: img.height,
    });
    const imageDimensions = {
      width: img.width,
      height: img.height,
    };

    this.setState({
      image: img,
      width: img.width,
      height: img.height,
      displayWidth: displayDimensions.width,
      displayHeight: displayDimensions.height,
    });

    this.props.onChange({ image: imageDimensions, canvas: displayDimensions });

    this.props.onImageChange(img);

    if (type === "cropping") {
      this.setState({ image: img });
    } else if (type === "rotating") {
      this.setState({ image: img });
    } else {
      this.setState({ image: img, uncropedImage: img });
      this.props.onSetInitialImage(img);
    }
  };
  rotateClockwise() {
    let degrees = 90;
    let canvas1 = document.createElement("canvas");
    let context = canvas1.getContext("2d");

    canvas1.width = this.state.image.width;
    canvas1.height = this.state.image.height;

    if (degrees >= 360) degrees = 0;
    if (degrees === 0 || degrees === 180) {
      canvas1.width = this.state.image.width;
      canvas1.height = this.state.image.height;
    } else {
      canvas1.width = this.state.image.height;
      canvas1.height = this.state.image.width;
    }

    context.save();
    context.translate(canvas1.width / 2, canvas1.height / 2);

    context.rotate((degrees * Math.PI) / 180);
    context.drawImage(
      this.state.image,
      -this.state.image.width * 0.5,
      -this.state.image.height * 0.5,
    );
    context.restore();
    this.handleLoad({ target: canvas1, type: "rotating" });
  }
  changeImagePerspective(degrees) {
    if (this.props.crop && this.props.crop.length === 4) {
      let crop = this.props.crop.map(c => [
        (c[0] / this.state.displayWidth) * this.state.image.width,
        (c[1] / this.state.displayHeight) * this.state.image.height,
      ]);

      let op1 = new UnwarpImage(this.state.image, null, degrees);
      op1.start();

      let op2 = new UnwarpImage(op1.canvas1, crop);
      op2.start();
      this.handleLoad({ target: op2.canvas1, type: "cropping" });
    } else {
      this.handleLoad({ target: this.state.uncropedImage, type: "cropping" });
    }
  }
  calculateDisplayHeight({ width, height }) {
    let dWidth = null;
    let dHeight = null;

    dHeight = this.props.maxHeight;
    dWidth = (dHeight / height) * width;

    if (dHeight > this.props.maxHeight || dWidth > this.props.maxWidth) {
      dWidth = this.props.maxWidth;
      dHeight = (dWidth / width) * height;
    }

    return { width: dWidth, height: dHeight };
  }

  render() {
    return (
      <Image
        x={this.state.displayWidth / 2}
        y={this.state.displayHeight / 2}
        offsetX={this.state.displayWidth / 2}
        offsetY={this.state.displayHeight / 2}
        width={this.state.displayWidth ?? 0}
        height={this.state.displayHeight ?? 0}
        image={this.state.image}
        rotation={this.props.tmpRotation}
        name="Url Image"
        ref={node => {
          this.imageNode = node;
        }}
        // onDblClick={() => this.download()}
      />
    );
  }
}

class UnwarpImage {
  constructor(img, crop = null, rotation = 0) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas1 = document.createElement("canvas");
    this.ctx1 = this.canvas1.getContext("2d");

    this.rotation = rotation;

    // anchors defining the warped rectangle
    if (crop) {
      this.anchors = {
        TL: { x: crop[0][0], y: crop[0][1] }, // r
        BL: { x: crop[1][0], y: crop[1][1] }, // g
        BR: { x: crop[2][0], y: crop[2][1] }, // b
        TR: { x: crop[3][0], y: crop[3][1] }, // gold
      };
    } else {
      this.anchors = {
        TL: { x: 0, y: 0 }, // r
        BL: { x: 0, y: img.height }, // g
        BR: { x: img.width, y: img.height }, // b
        TR: { x: img.width, y: 0 }, // gold
      };
    }

    this.avHeight =
      (this.anchors.BL.y -
        this.anchors.TL.y +
        (this.anchors.BR.y - this.anchors.TR.y)) /
      2;
    this.avWidth =
      (this.anchors.TR.x -
        this.anchors.TL.x +
        (this.anchors.BR.x - this.anchors.BL.x)) /
      2;

    // cornerpoints defining the desire unwarped rectangle
    this.unwarped = {
      TL: { x: 0, y: 0 }, // r
      TR: { x: this.avWidth, y: 0 }, // g
      BR: { x: this.avWidth, y: this.avHeight }, // b
      BL: { x: 0, y: this.avHeight }, // gold
    };

    // load example image
    this.img = img;
  }

  start() {
    // set canvas sizes equal to image size
    this.canvas.width = this.canvas1.width = this.img.width;
    this.canvas.height = this.canvas1.height = this.img.height;

    if (this.avWidth && this.avHeight) {
      this.canvas1.width = this.avWidth;
      this.canvas1.height = this.avHeight;
    }

    // draw the example image on the source canvas
    // this.ctx.drawImage(this.img, 0, 0);

    // unwarp the source rectangle and draw it to the destination canvas
    this.unwarp(this.anchors, this.unwarped, this.ctx1);
  }

  // unwarp the source rectangle
  unwarp(anchors, unwarped, context) {
    // clear the destination canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // Translate to the center point of our image
    context.translate(this.img.width * 0.5, this.img.height * 0.5);
    // Perform the rotation
    context.rotate((this.rotation * Math.PI) / 180);
    // Translate back to the top left of our image
    context.translate(-this.img.width * 0.5, -this.img.height * 0.5);

    // unwarp the bottom-left triangle of the warped polygon
    this.mapTriangle(
      context,
      anchors.TL,
      anchors.BR,
      anchors.BL,
      unwarped.TL,
      unwarped.BR,
      unwarped.BL,
    );

    // eliminate slight space between triangles
    this.ctx1.translate(-1, 1);

    // unwarp the top-right triangle of the warped polygon
    this.mapTriangle(
      context,
      anchors.TL,
      anchors.TR,
      anchors.BR,
      unwarped.TL,
      unwarped.TR,
      unwarped.BR,
    );
  }

  // Perspective mapping: Map warped triangle into unwarped triangle
  // Attribution: (SO user: 6502), http://stackoverflow.com/questions/4774172/image-manipulation-and-texture-mapping-using-html5-canvas/4774298#4774298
  mapTriangle(ctx, p0, p1, p2, p_0, p_1, p_2) {
    // break out the individual triangles x's & y's
    var x0 = p_0.x,
      y0 = p_0.y;
    var x1 = p_1.x,
      y1 = p_1.y;
    var x2 = p_2.x,
      y2 = p_2.y;
    var u0 = p0.x,
      v0 = p0.y;
    var u1 = p1.x,
      v1 = p1.y;
    var u2 = p2.x,
      v2 = p2.y;

    // save the unclipped & untransformed destination canvas
    ctx.save();

    // clip the destination canvas to the unwarped destination triangle
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.clip();

    // Compute matrix transform
    var delta = u0 * v1 + v0 * u2 + u1 * v2 - v1 * u2 - v0 * u1 - u0 * v2;
    var delta_a = x0 * v1 + v0 * x2 + x1 * v2 - v1 * x2 - v0 * x1 - x0 * v2;
    var delta_b = u0 * x1 + x0 * u2 + u1 * x2 - x1 * u2 - x0 * u1 - u0 * x2;
    var delta_c =
      u0 * v1 * x2 +
      v0 * x1 * u2 +
      x0 * u1 * v2 -
      x0 * v1 * u2 -
      v0 * u1 * x2 -
      u0 * x1 * v2;
    var delta_d = y0 * v1 + v0 * y2 + y1 * v2 - v1 * y2 - v0 * y1 - y0 * v2;
    var delta_e = u0 * y1 + y0 * u2 + u1 * y2 - y1 * u2 - y0 * u1 - u0 * y2;
    var delta_f =
      u0 * v1 * y2 +
      v0 * y1 * u2 +
      y0 * u1 * v2 -
      y0 * v1 * u2 -
      v0 * u1 * y2 -
      u0 * y1 * v2;

    // Draw the transformed image
    ctx.transform(
      delta_a / delta,
      delta_d / delta,
      delta_b / delta,
      delta_e / delta,
      delta_c / delta,
      delta_f / delta,
    );

    // draw the transformed source image to the destination canvas
    ctx.drawImage(this.img, 0, 0);

    // restore the context to it's unclipped untransformed state
    ctx.restore();
  }
}
