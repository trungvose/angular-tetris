import { BlockType } from '../block/block-type';

export class BlockUtil {
  static get nextBlock(): BlockType {
    let blockTypes: string[] = Object.values(BlockType);
    return blockTypes[Math.floor(Math.random() * blockTypes.length)] as BlockType;
  }
}
