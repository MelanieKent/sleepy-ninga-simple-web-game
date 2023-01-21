/*!
 * @pixi/graphics-extras - v7.1.0
 * Compiled Tue, 10 Jan 2023 21:29:23 UTC
 *
 * @pixi/graphics-extras is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
(function (graphics, core) {
    'use strict';

    function drawChamferRect(x, y, width, height, chamfer) {
      if (chamfer <= 0) {
        return this.drawRect(x, y, width, height);
      }
      const inset = Math.min(chamfer, Math.min(width, height) / 2);
      const right = x + width;
      const bottom = y + height;
      const points = [
        x + inset,
        y,
        right - inset,
        y,
        right,
        y + inset,
        right,
        bottom - inset,
        right - inset,
        bottom,
        x + inset,
        bottom,
        x,
        bottom - inset,
        x,
        y + inset
      ];
      for (let i = points.length - 1; i >= 2; i -= 2) {
        if (points[i] === points[i - 2] && points[i - 1] === points[i - 3]) {
          points.splice(i - 1, 2);
        }
      }
      return this.drawPolygon(points);
    }

    function drawFilletRect(x, y, width, height, fillet) {
      if (fillet === 0) {
        return this.drawRect(x, y, width, height);
      }
      const maxFillet = Math.min(width, height) / 2;
      const inset = Math.min(maxFillet, Math.max(-maxFillet, fillet));
      const right = x + width;
      const bottom = y + height;
      const dir = inset < 0 ? -inset : 0;
      const size = Math.abs(inset);
      return this.moveTo(x, y + size).arcTo(x + dir, y + dir, x + size, y, size).lineTo(right - size, y).arcTo(right - dir, y + dir, right, y + size, size).lineTo(right, bottom - size).arcTo(right - dir, bottom - dir, x + width - size, bottom, size).lineTo(x + size, bottom).arcTo(x + dir, bottom - dir, x, bottom - size, size).closePath();
    }

    function drawRegularPolygon(x, y, radius, sides, rotation = 0) {
      sides = Math.max(sides | 0, 3);
      const startAngle = -1 * Math.PI / 2 + rotation;
      const delta = Math.PI * 2 / sides;
      const polygon = [];
      for (let i = 0; i < sides; i++) {
        const angle = i * delta + startAngle;
        polygon.push(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
      }
      return this.drawPolygon(polygon);
    }

    function drawRoundedPolygon(x, y, radius, sides, corner, rotation = 0) {
      sides = Math.max(sides | 0, 3);
      if (corner <= 0) {
        return this.drawRegularPolygon(x, y, radius, sides, rotation);
      }
      const sideLength = radius * Math.sin(Math.PI / sides) - 1e-3;
      corner = Math.min(corner, sideLength);
      const startAngle = -1 * Math.PI / 2 + rotation;
      const delta = Math.PI * 2 / sides;
      const internalAngle = (sides - 2) * Math.PI / sides / 2;
      for (let i = 0; i < sides; i++) {
        const angle = i * delta + startAngle;
        const x0 = x + radius * Math.cos(angle);
        const y0 = y + radius * Math.sin(angle);
        const a1 = angle + Math.PI + internalAngle;
        const a2 = angle - Math.PI - internalAngle;
        const x1 = x0 + corner * Math.cos(a1);
        const y1 = y0 + corner * Math.sin(a1);
        const x3 = x0 + corner * Math.cos(a2);
        const y3 = y0 + corner * Math.sin(a2);
        if (i === 0) {
          this.moveTo(x1, y1);
        } else {
          this.lineTo(x1, y1);
        }
        this.quadraticCurveTo(x0, y0, x3, y3);
      }
      return this.closePath();
    }

    class Star extends core.Polygon {
      constructor(x, y, points, radius, innerRadius, rotation = 0) {
        innerRadius = innerRadius || radius / 2;
        const startAngle = -1 * Math.PI / 2 + rotation;
        const len = points * 2;
        const delta = core.PI_2 / len;
        const polygon = [];
        for (let i = 0; i < len; i++) {
          const r = i % 2 ? innerRadius : radius;
          const angle = i * delta + startAngle;
          polygon.push(x + r * Math.cos(angle), y + r * Math.sin(angle));
        }
        super(polygon);
      }
    }
    function drawStar(x, y, points, radius, innerRadius, rotation = 0) {
      return this.drawPolygon(new Star(x, y, points, radius, innerRadius, rotation));
    }

    function drawTorus(x, y, innerRadius, outerRadius, startArc = 0, endArc = Math.PI * 2) {
      if (Math.abs(endArc - startArc) >= Math.PI * 2) {
        return this.drawCircle(x, y, outerRadius).beginHole().drawCircle(x, y, innerRadius).endHole();
      }
      this.finishPoly();
      this.arc(x, y, innerRadius, endArc, startArc, true).arc(x, y, outerRadius, startArc, endArc, false).finishPoly();
      return this;
    }

    Object.defineProperties(graphics.Graphics.prototype, {
      drawTorus: { value: drawTorus },
      drawChamferRect: { value: drawChamferRect },
      drawFilletRect: { value: drawFilletRect },
      drawRegularPolygon: { value: drawRegularPolygon },
      drawRoundedPolygon: { value: drawRoundedPolygon },
      drawStar: { value: drawStar }
    });

})(PIXI, PIXI);
//# sourceMappingURL=graphics-extras.js.map
