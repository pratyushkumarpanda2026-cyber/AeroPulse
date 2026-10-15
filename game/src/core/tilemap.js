// Tile map data and collision rules. No drawing here.
//
// Tile ids (placeholder until real art exists):
//   0 grass   1 tree (solid)   2 water (solid)   3 path   4 tall grass

export const SOLID_TILES = new Set([1, 2]);

export class TileMap {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.tileSize = data.tileSize;
    this.tiles = data.tiles;
    this.start = data.start;
  }

  inBounds(tx, ty) {
    return tx >= 0 && ty >= 0 && tx < this.width && ty < this.height;
  }

  get(tx, ty) {
    return this.inBounds(tx, ty) ? this.tiles[ty][tx] : 1;
  }

  isSolid(tx, ty) {
    return !this.inBounds(tx, ty) || SOLID_TILES.has(this.tiles[ty][tx]);
  }
}