import { BlockService } from '@blocksuite/block-std';

import { BaseService } from '../__internal__/service/service.js';
import type {
  BlockTransformContext,
  SerializedBlock,
} from '../__internal__/utils/index.js';
import type { ImageBlockModel } from './image-model.js';
import { ImageSelection } from './image-selection.js';
export class ImageBlockService extends BaseService<ImageBlockModel> {
  override async block2html(
    block: ImageBlockModel,
    _ctx: BlockTransformContext = {},
    blobMap?: Map<string, string>
  ) {
    const blobId = block.sourceId;
    let imageSrc = blobId;
    if (blobMap) {
      if (blobMap.has(blobId)) {
        imageSrc = blobMap.get(blobId) ?? '';
      } else {
        const blob = await block.page.blobs.get(blobId);
        if (blob) {
          imageSrc = `images/${blobId}.${blob.type.split('/')[1]}`;
          blobMap.set(blobId, imageSrc);
        }
      }
    }
    return `<figure><img src="${imageSrc}" alt="${block.caption}"><figcaption>${block.caption}</figcaption></figure>`;
  }

  override block2Text(
    block: ImageBlockModel,
    _ctx: BlockTransformContext = {}
  ): string {
    return block.caption ?? '';
  }

  override block2Json(
    block: ImageBlockModel,
    _selectedModels?: Map<string, number>,
    _begin?: number,
    _end?: number
  ): SerializedBlock {
    return {
      sourceId: block.sourceId,
      width: block.width,
      height: block.height,
      caption: block.caption,
      flavour: block.flavour,
      children: [],
    };
  }
}

export class ImageService extends BlockService<ImageBlockModel> {
  override mounted(): void {
    super.mounted();
    this.selectionManager.register(ImageSelection);
  }
}
