import type { Disposable } from '@blocksuite/global/utils';
import { assertExists, Slot } from '@blocksuite/global/utils';
import type { BlockSuiteRoot } from '@blocksuite/lit';
import type { BaseBlockModel } from '@blocksuite/store';
import { Text, type Y } from '@blocksuite/store';

import { checkboxColumnConfig } from '../../database-block/common/columns/checkbox/cell-renderer.js';
import { dateColumnConfig } from '../../database-block/common/columns/date/cell-renderer.js';
import { imageColumnConfig } from '../../database-block/common/columns/image/cell-renderer.js';
import { linkColumnConfig } from '../../database-block/common/columns/link/cell-renderer.js';
import type { ColumnConfig } from '../../database-block/common/columns/manager.js';
import { columnManager } from '../../database-block/common/columns/manager.js';
import { multiSelectColumnConfig } from '../../database-block/common/columns/multi-select/cell-renderer.js';
import { multiSelectPureColumnConfig } from '../../database-block/common/columns/multi-select/define.js';
import { numberColumnConfig } from '../../database-block/common/columns/number/cell-renderer.js';
import { progressColumnConfig } from '../../database-block/common/columns/progress/cell-renderer.js';
import { richTextColumnConfig } from '../../database-block/common/columns/rich-text/cell-renderer.js';
import { selectColumnConfig } from '../../database-block/common/columns/select/cell-renderer.js';
import { titleColumnConfig } from '../../database-block/common/columns/title/cell-renderer.js';
import type { DatabaseBlockModel } from '../../database-block/database-model.js';
import type { InsertPosition } from '../../database-block/index.js';
import { insertPositionToIndex } from '../../database-block/utils/insert.js';
import type { ListBlockModel } from '../../list-block/index.js';
import type { DatabaseBlockDatasourceConfig } from './base.js';
import { BaseDataSource } from './base.js';

const createUrl = (svg: string) => {
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
};
const getIcon = (model: BaseBlockModel): string => {
  if (model.flavour === 'affine:paragraph') {
    return createUrl(`<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path fill-rule='evenodd' clip-rule='evenodd' d='M2.16675 2.6665C2.16675 2.39036 2.39061 2.1665 2.66675 2.1665H13.3334C13.6096 2.1665 13.8334 2.39036 13.8334 2.6665V4.44428C13.8334 4.72042 13.6096 4.94428 13.3334 4.94428C13.0573 4.94428 12.8334 4.72042 12.8334 4.44428V3.1665H8.50008V12.8332H10.6667C10.9429 12.8332 11.1667 13.057 11.1667 13.3332C11.1667 13.6093 10.9429 13.8332 10.6667 13.8332H5.33341C5.05727 13.8332 4.83341 13.6093 4.83341 13.3332C4.83341 13.057 5.05727 12.8332 5.33341 12.8332H7.50008V3.1665H3.16675V4.44428C3.16675 4.72042 2.94289 4.94428 2.66675 4.94428C2.39061 4.94428 2.16675 4.72042 2.16675 4.44428V2.6665Z' fill='#77757D'/>
</svg>
`);
  }
  if (model.flavour === 'affine:list') {
    return (
      {
        bulleted:
          createUrl(`<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path fill-rule='evenodd' clip-rule='evenodd' d='M2.86686 4.99984C3.23505 4.99984 3.53353 4.70136 3.53353 4.33317C3.53353 3.96498 3.23505 3.6665 2.86686 3.6665C2.49867 3.6665 2.2002 3.96498 2.2002 4.33317C2.2002 4.70136 2.49867 4.99984 2.86686 4.99984ZM5.55577 3.83366C5.27963 3.83364 5.05576 4.05749 5.05575 4.33363C5.05573 4.60977 5.27958 4.83364 5.55572 4.83366L13.5001 4.8341C13.7763 4.83412 14.0002 4.61027 14.0002 4.33413C14.0002 4.05799 13.7763 3.83412 13.5002 3.8341L5.55577 3.83366ZM5.55578 7.50036C5.27963 7.50034 5.05576 7.72419 5.05575 8.00033C5.05573 8.27647 5.27957 8.50034 5.55572 8.50036L13.5002 8.50084C13.7763 8.50085 14.0002 8.27701 14.0002 8.00087C14.0002 7.72473 13.7764 7.50085 13.5002 7.50084L5.55578 7.50036ZM5.55578 11.167C5.27963 11.167 5.05576 11.3909 5.05575 11.667C5.05573 11.9431 5.27957 12.167 5.55571 12.167L13.5002 12.1675C13.7763 12.1675 14.0002 11.9437 14.0002 11.6675C14.0002 11.3914 13.7764 11.1675 13.5002 11.1675L5.55578 11.167ZM3.53353 7.99984C3.53353 8.36803 3.23505 8.6665 2.86686 8.6665C2.49867 8.6665 2.2002 8.36803 2.2002 7.99984C2.2002 7.63165 2.49867 7.33317 2.86686 7.33317C3.23505 7.33317 3.53353 7.63165 3.53353 7.99984ZM2.86686 12.3332C3.23505 12.3332 3.53353 12.0347 3.53353 11.6665C3.53353 11.2983 3.23505 10.9998 2.86686 10.9998C2.49867 10.9998 2.2002 11.2983 2.2002 11.6665C2.2002 12.0347 2.49867 12.3332 2.86686 12.3332Z' fill='#77757D'/>
</svg>
`),
        numbered:
          createUrl(`<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path fill-rule='evenodd' clip-rule='evenodd' d='M2.75263 3.84129C2.7875 3.82957 2.81892 3.8114 2.85247 3.78811L3.02274 3.67014V5.09323C3.02274 5.21832 3.06494 5.32685 3.14381 5.40413C3.22253 5.48125 3.33201 5.52164 3.45631 5.52164C3.58061 5.52164 3.69008 5.48125 3.7688 5.40413C3.84767 5.32685 3.88988 5.21832 3.88988 5.09323V3.28915C3.88988 3.14995 3.84638 3.02894 3.75909 2.9427C3.67187 2.85652 3.54844 2.8125 3.40289 2.8125C3.25521 2.8125 3.11383 2.82716 2.95315 2.93428L2.50128 3.2361C2.38666 3.31388 2.3335 3.41744 2.3335 3.54244C2.3335 3.72457 2.46885 3.85712 2.643 3.85712C2.68225 3.85712 2.71723 3.85318 2.75263 3.84129ZM6.27061 3.73425C5.98781 3.73424 5.75855 3.96348 5.75853 4.24627C5.75851 4.52907 5.98775 4.75834 6.27055 4.75835L13.1548 4.75877C13.4375 4.75878 13.6668 4.52955 13.6668 4.24675C13.6668 3.96395 13.4376 3.73469 13.1548 3.73467L6.27061 3.73425ZM6.27061 7.48928C5.98781 7.48926 5.75855 7.7185 5.75853 8.0013C5.75851 8.28409 5.98775 8.51336 6.27055 8.51338L13.1548 8.51379C13.4375 8.51381 13.6668 8.28457 13.6668 8.00177C13.6668 7.71898 13.4376 7.48971 13.1548 7.48969L6.27061 7.48928ZM6.27061 11.2443C5.98781 11.2443 5.75855 11.4735 5.75853 11.7563C5.75851 12.0391 5.98775 12.2684 6.27055 12.2684L13.1548 12.2688C13.4375 12.2688 13.6668 12.0396 13.6668 11.7568C13.6668 11.474 13.4376 11.2447 13.1548 11.2447L6.27061 11.2443ZM4.41634 7.40927C4.42422 7.36527 4.4281 7.31875 4.4281 7.26863C4.4281 6.81717 4.04212 6.51219 3.43732 6.51219C3.00309 6.51219 2.65331 6.69656 2.52235 6.99293C2.51378 7.01271 2.50697 7.03274 2.50184 7.05312C2.50698 7.03272 2.51379 7.01266 2.52237 6.99286C2.65332 6.69649 3.00311 6.51212 3.43733 6.51212C4.04214 6.51212 4.42811 6.81711 4.42811 7.26856C4.42811 7.31871 4.42423 7.36525 4.41634 7.40927ZM3.41666 8.50235L3.41664 8.50237V8.51615H4.20582C4.38847 8.51615 4.49185 8.62471 4.49185 8.79185C4.49185 8.81304 4.49012 8.83337 4.4867 8.8527C4.49013 8.83335 4.49187 8.813 4.49187 8.79178C4.49187 8.62464 4.38848 8.51609 4.20583 8.51609H3.41666V8.50235ZM2.49348 8.66081C2.51659 8.56781 2.5776 8.48686 2.68261 8.39891L3.36669 7.81306C3.59238 7.61941 3.68741 7.51137 3.71552 7.39877C3.68743 7.51139 3.5924 7.61944 3.36667 7.81313L2.6826 8.39898C2.57761 8.48691 2.5166 8.56784 2.49348 8.66081ZM3.00245 7.45433C3.06576 7.41672 3.11852 7.35967 3.16964 7.28485C3.21335 7.22174 3.25281 7.18119 3.29247 7.15611C3.33084 7.13184 3.37305 7.11972 3.42699 7.11972C3.50193 7.11972 3.55935 7.14252 3.59712 7.17625C3.63429 7.20945 3.65682 7.25695 3.65682 7.31681C3.65682 7.42976 3.60418 7.51932 3.32223 7.76125L2.63848 8.34682C2.49238 8.46926 2.41446 8.58999 2.41446 8.75215C2.41446 8.85599 2.44402 8.95417 2.51569 9.0264C2.58758 9.09884 2.69247 9.13575 2.82391 9.13575H4.20583C4.3113 9.13575 4.40151 9.10312 4.46551 9.0394C4.52944 8.97575 4.56014 8.88812 4.56014 8.79178C4.56014 8.69402 4.52962 8.60612 4.4653 8.54266C4.40102 8.47924 4.31071 8.44781 4.20583 8.44781H3.58427L3.91453 8.16277C4.10644 7.99655 4.25236 7.86439 4.34915 7.7297C4.44874 7.59113 4.49639 7.45014 4.49639 7.26856C4.49639 7.02135 4.38982 6.81239 4.20121 6.66698C4.01414 6.52275 3.75049 6.44385 3.43733 6.44385C2.98691 6.44385 2.6054 6.63603 2.45972 6.96572C2.43335 7.02657 2.42135 7.0893 2.42135 7.15484C2.42135 7.25786 2.45508 7.34813 2.52273 7.4124C2.58996 7.47627 2.68328 7.50742 2.78945 7.50742C2.86827 7.50742 2.93794 7.49266 3.00245 7.45433ZM2.44775 10.7189C2.54915 10.4426 2.89358 10.1497 3.48551 10.1497C3.79028 10.1497 4.06201 10.2142 4.2587 10.3428C4.45674 10.4723 4.57779 10.6665 4.57779 10.9198C4.57779 11.2417 4.37235 11.4558 4.11613 11.5474C4.27228 11.5802 4.40301 11.6427 4.5004 11.7331C4.62307 11.8471 4.69016 12.0029 4.69016 12.1915C4.69016 12.4609 4.57389 12.6823 4.36382 12.8352C4.15486 12.9873 3.85534 13.0702 3.48925 13.0702C2.84939 13.0702 2.49302 12.7648 2.39522 12.4914C2.3769 12.4405 2.36887 12.3841 2.36887 12.3394C2.36887 12.2332 2.40451 12.1439 2.47207 12.0814C2.53931 12.0192 2.63451 11.9869 2.74761 11.9869C2.82533 11.9869 2.89225 11.9997 2.95092 12.0292C3.00974 12.0587 3.05785 12.1038 3.09973 12.1646C3.14935 12.2372 3.19619 12.2915 3.2569 12.3282C3.31713 12.3647 3.39437 12.3858 3.50798 12.3858C3.69342 12.3858 3.8147 12.2759 3.8147 12.1334C3.8147 12.047 3.78226 11.984 3.7209 11.9411C3.65761 11.8969 3.55985 11.8716 3.42558 11.8716H3.40685C3.30795 11.8716 3.22859 11.8441 3.1739 11.7905C3.11916 11.7368 3.09366 11.6616 3.09366 11.5753C3.09366 11.4924 3.11937 11.4179 3.17378 11.364C3.22823 11.3101 3.30745 11.2809 3.40685 11.2809H3.42558C3.54389 11.2809 3.63283 11.255 3.69126 11.2123C3.74841 11.1705 3.77911 11.1107 3.77911 11.0341C3.77911 10.9598 3.75194 10.9019 3.70443 10.8619C3.65624 10.8214 3.58381 10.7967 3.48925 10.7967C3.41343 10.7967 3.35069 10.8121 3.29851 10.8418C3.24639 10.8715 3.20271 10.9168 3.16682 10.9798C3.12025 11.0623 3.06988 11.1219 3.00589 11.1605C2.94171 11.1991 2.86754 11.2143 2.77758 11.2143C2.66225 11.2143 2.57171 11.1804 2.50997 11.1186C2.44832 11.057 2.41944 10.9716 2.41944 10.8768C2.41944 10.8201 2.42781 10.7748 2.44775 10.7189Z' fill='#77757D'/>
</svg>`),
        todo: createUrl(`<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path fill-rule='evenodd' clip-rule='evenodd' d='M2.75263 3.84129C2.7875 3.82957 2.81892 3.8114 2.85247 3.78811L3.02274 3.67014V5.09323C3.02274 5.21832 3.06494 5.32685 3.14381 5.40413C3.22253 5.48125 3.33201 5.52164 3.45631 5.52164C3.58061 5.52164 3.69008 5.48125 3.7688 5.40413C3.84767 5.32685 3.88988 5.21832 3.88988 5.09323V3.28915C3.88988 3.14995 3.84638 3.02894 3.75909 2.9427C3.67187 2.85652 3.54844 2.8125 3.40289 2.8125C3.25521 2.8125 3.11383 2.82716 2.95315 2.93428L2.50128 3.2361C2.38666 3.31388 2.3335 3.41744 2.3335 3.54244C2.3335 3.72457 2.46885 3.85712 2.643 3.85712C2.68225 3.85712 2.71723 3.85318 2.75263 3.84129ZM6.27061 3.73425C5.98781 3.73424 5.75855 3.96348 5.75853 4.24627C5.75851 4.52907 5.98775 4.75834 6.27055 4.75835L13.1548 4.75877C13.4375 4.75878 13.6668 4.52955 13.6668 4.24675C13.6668 3.96395 13.4376 3.73469 13.1548 3.73467L6.27061 3.73425ZM6.27061 7.48928C5.98781 7.48926 5.75855 7.7185 5.75853 8.0013C5.75851 8.28409 5.98775 8.51336 6.27055 8.51338L13.1548 8.51379C13.4375 8.51381 13.6668 8.28457 13.6668 8.00177C13.6668 7.71898 13.4376 7.48971 13.1548 7.48969L6.27061 7.48928ZM6.27061 11.2443C5.98781 11.2443 5.75855 11.4735 5.75853 11.7563C5.75851 12.0391 5.98775 12.2684 6.27055 12.2684L13.1548 12.2688C13.4375 12.2688 13.6668 12.0396 13.6668 11.7568C13.6668 11.474 13.4376 11.2447 13.1548 11.2447L6.27061 11.2443ZM4.41634 7.40927C4.42422 7.36527 4.4281 7.31875 4.4281 7.26863C4.4281 6.81717 4.04212 6.51219 3.43732 6.51219C3.00309 6.51219 2.65331 6.69656 2.52235 6.99293C2.51378 7.01271 2.50697 7.03274 2.50184 7.05312C2.50698 7.03272 2.51379 7.01266 2.52237 6.99286C2.65332 6.69649 3.00311 6.51212 3.43733 6.51212C4.04214 6.51212 4.42811 6.81711 4.42811 7.26856C4.42811 7.31871 4.42423 7.36525 4.41634 7.40927ZM3.41666 8.50235L3.41664 8.50237V8.51615H4.20582C4.38847 8.51615 4.49185 8.62471 4.49185 8.79185C4.49185 8.81304 4.49012 8.83337 4.4867 8.8527C4.49013 8.83335 4.49187 8.813 4.49187 8.79178C4.49187 8.62464 4.38848 8.51609 4.20583 8.51609H3.41666V8.50235ZM2.49348 8.66081C2.51659 8.56781 2.5776 8.48686 2.68261 8.39891L3.36669 7.81306C3.59238 7.61941 3.68741 7.51137 3.71552 7.39877C3.68743 7.51139 3.5924 7.61944 3.36667 7.81313L2.6826 8.39898C2.57761 8.48691 2.5166 8.56784 2.49348 8.66081ZM3.00245 7.45433C3.06576 7.41672 3.11852 7.35967 3.16964 7.28485C3.21335 7.22174 3.25281 7.18119 3.29247 7.15611C3.33084 7.13184 3.37305 7.11972 3.42699 7.11972C3.50193 7.11972 3.55935 7.14252 3.59712 7.17625C3.63429 7.20945 3.65682 7.25695 3.65682 7.31681C3.65682 7.42976 3.60418 7.51932 3.32223 7.76125L2.63848 8.34682C2.49238 8.46926 2.41446 8.58999 2.41446 8.75215C2.41446 8.85599 2.44402 8.95417 2.51569 9.0264C2.58758 9.09884 2.69247 9.13575 2.82391 9.13575H4.20583C4.3113 9.13575 4.40151 9.10312 4.46551 9.0394C4.52944 8.97575 4.56014 8.88812 4.56014 8.79178C4.56014 8.69402 4.52962 8.60612 4.4653 8.54266C4.40102 8.47924 4.31071 8.44781 4.20583 8.44781H3.58427L3.91453 8.16277C4.10644 7.99655 4.25236 7.86439 4.34915 7.7297C4.44874 7.59113 4.49639 7.45014 4.49639 7.26856C4.49639 7.02135 4.38982 6.81239 4.20121 6.66698C4.01414 6.52275 3.75049 6.44385 3.43733 6.44385C2.98691 6.44385 2.6054 6.63603 2.45972 6.96572C2.43335 7.02657 2.42135 7.0893 2.42135 7.15484C2.42135 7.25786 2.45508 7.34813 2.52273 7.4124C2.58996 7.47627 2.68328 7.50742 2.78945 7.50742C2.86827 7.50742 2.93794 7.49266 3.00245 7.45433ZM2.44775 10.7189C2.54915 10.4426 2.89358 10.1497 3.48551 10.1497C3.79028 10.1497 4.06201 10.2142 4.2587 10.3428C4.45674 10.4723 4.57779 10.6665 4.57779 10.9198C4.57779 11.2417 4.37235 11.4558 4.11613 11.5474C4.27228 11.5802 4.40301 11.6427 4.5004 11.7331C4.62307 11.8471 4.69016 12.0029 4.69016 12.1915C4.69016 12.4609 4.57389 12.6823 4.36382 12.8352C4.15486 12.9873 3.85534 13.0702 3.48925 13.0702C2.84939 13.0702 2.49302 12.7648 2.39522 12.4914C2.3769 12.4405 2.36887 12.3841 2.36887 12.3394C2.36887 12.2332 2.40451 12.1439 2.47207 12.0814C2.53931 12.0192 2.63451 11.9869 2.74761 11.9869C2.82533 11.9869 2.89225 11.9997 2.95092 12.0292C3.00974 12.0587 3.05785 12.1038 3.09973 12.1646C3.14935 12.2372 3.19619 12.2915 3.2569 12.3282C3.31713 12.3647 3.39437 12.3858 3.50798 12.3858C3.69342 12.3858 3.8147 12.2759 3.8147 12.1334C3.8147 12.047 3.78226 11.984 3.7209 11.9411C3.65761 11.8969 3.55985 11.8716 3.42558 11.8716H3.40685C3.30795 11.8716 3.22859 11.8441 3.1739 11.7905C3.11916 11.7368 3.09366 11.6616 3.09366 11.5753C3.09366 11.4924 3.11937 11.4179 3.17378 11.364C3.22823 11.3101 3.30745 11.2809 3.40685 11.2809H3.42558C3.54389 11.2809 3.63283 11.255 3.69126 11.2123C3.74841 11.1705 3.77911 11.1107 3.77911 11.0341C3.77911 10.9598 3.75194 10.9019 3.70443 10.8619C3.65624 10.8214 3.58381 10.7967 3.48925 10.7967C3.41343 10.7967 3.35069 10.8121 3.29851 10.8418C3.24639 10.8715 3.20271 10.9168 3.16682 10.9798C3.12025 11.0623 3.06988 11.1219 3.00589 11.1605C2.94171 11.1991 2.86754 11.2143 2.77758 11.2143C2.66225 11.2143 2.57171 11.1804 2.50997 11.1186C2.44832 11.057 2.41944 10.9716 2.41944 10.8768C2.41944 10.8201 2.42781 10.7748 2.44775 10.7189Z' fill='#77757D'/>
</svg>`),
        toggle:
          createUrl(`<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path fill-rule='evenodd' clip-rule='evenodd' d='M2.75263 3.84129C2.7875 3.82957 2.81892 3.8114 2.85247 3.78811L3.02274 3.67014V5.09323C3.02274 5.21832 3.06494 5.32685 3.14381 5.40413C3.22253 5.48125 3.33201 5.52164 3.45631 5.52164C3.58061 5.52164 3.69008 5.48125 3.7688 5.40413C3.84767 5.32685 3.88988 5.21832 3.88988 5.09323V3.28915C3.88988 3.14995 3.84638 3.02894 3.75909 2.9427C3.67187 2.85652 3.54844 2.8125 3.40289 2.8125C3.25521 2.8125 3.11383 2.82716 2.95315 2.93428L2.50128 3.2361C2.38666 3.31388 2.3335 3.41744 2.3335 3.54244C2.3335 3.72457 2.46885 3.85712 2.643 3.85712C2.68225 3.85712 2.71723 3.85318 2.75263 3.84129ZM6.27061 3.73425C5.98781 3.73424 5.75855 3.96348 5.75853 4.24627C5.75851 4.52907 5.98775 4.75834 6.27055 4.75835L13.1548 4.75877C13.4375 4.75878 13.6668 4.52955 13.6668 4.24675C13.6668 3.96395 13.4376 3.73469 13.1548 3.73467L6.27061 3.73425ZM6.27061 7.48928C5.98781 7.48926 5.75855 7.7185 5.75853 8.0013C5.75851 8.28409 5.98775 8.51336 6.27055 8.51338L13.1548 8.51379C13.4375 8.51381 13.6668 8.28457 13.6668 8.00177C13.6668 7.71898 13.4376 7.48971 13.1548 7.48969L6.27061 7.48928ZM6.27061 11.2443C5.98781 11.2443 5.75855 11.4735 5.75853 11.7563C5.75851 12.0391 5.98775 12.2684 6.27055 12.2684L13.1548 12.2688C13.4375 12.2688 13.6668 12.0396 13.6668 11.7568C13.6668 11.474 13.4376 11.2447 13.1548 11.2447L6.27061 11.2443ZM4.41634 7.40927C4.42422 7.36527 4.4281 7.31875 4.4281 7.26863C4.4281 6.81717 4.04212 6.51219 3.43732 6.51219C3.00309 6.51219 2.65331 6.69656 2.52235 6.99293C2.51378 7.01271 2.50697 7.03274 2.50184 7.05312C2.50698 7.03272 2.51379 7.01266 2.52237 6.99286C2.65332 6.69649 3.00311 6.51212 3.43733 6.51212C4.04214 6.51212 4.42811 6.81711 4.42811 7.26856C4.42811 7.31871 4.42423 7.36525 4.41634 7.40927ZM3.41666 8.50235L3.41664 8.50237V8.51615H4.20582C4.38847 8.51615 4.49185 8.62471 4.49185 8.79185C4.49185 8.81304 4.49012 8.83337 4.4867 8.8527C4.49013 8.83335 4.49187 8.813 4.49187 8.79178C4.49187 8.62464 4.38848 8.51609 4.20583 8.51609H3.41666V8.50235ZM2.49348 8.66081C2.51659 8.56781 2.5776 8.48686 2.68261 8.39891L3.36669 7.81306C3.59238 7.61941 3.68741 7.51137 3.71552 7.39877C3.68743 7.51139 3.5924 7.61944 3.36667 7.81313L2.6826 8.39898C2.57761 8.48691 2.5166 8.56784 2.49348 8.66081ZM3.00245 7.45433C3.06576 7.41672 3.11852 7.35967 3.16964 7.28485C3.21335 7.22174 3.25281 7.18119 3.29247 7.15611C3.33084 7.13184 3.37305 7.11972 3.42699 7.11972C3.50193 7.11972 3.55935 7.14252 3.59712 7.17625C3.63429 7.20945 3.65682 7.25695 3.65682 7.31681C3.65682 7.42976 3.60418 7.51932 3.32223 7.76125L2.63848 8.34682C2.49238 8.46926 2.41446 8.58999 2.41446 8.75215C2.41446 8.85599 2.44402 8.95417 2.51569 9.0264C2.58758 9.09884 2.69247 9.13575 2.82391 9.13575H4.20583C4.3113 9.13575 4.40151 9.10312 4.46551 9.0394C4.52944 8.97575 4.56014 8.88812 4.56014 8.79178C4.56014 8.69402 4.52962 8.60612 4.4653 8.54266C4.40102 8.47924 4.31071 8.44781 4.20583 8.44781H3.58427L3.91453 8.16277C4.10644 7.99655 4.25236 7.86439 4.34915 7.7297C4.44874 7.59113 4.49639 7.45014 4.49639 7.26856C4.49639 7.02135 4.38982 6.81239 4.20121 6.66698C4.01414 6.52275 3.75049 6.44385 3.43733 6.44385C2.98691 6.44385 2.6054 6.63603 2.45972 6.96572C2.43335 7.02657 2.42135 7.0893 2.42135 7.15484C2.42135 7.25786 2.45508 7.34813 2.52273 7.4124C2.58996 7.47627 2.68328 7.50742 2.78945 7.50742C2.86827 7.50742 2.93794 7.49266 3.00245 7.45433ZM2.44775 10.7189C2.54915 10.4426 2.89358 10.1497 3.48551 10.1497C3.79028 10.1497 4.06201 10.2142 4.2587 10.3428C4.45674 10.4723 4.57779 10.6665 4.57779 10.9198C4.57779 11.2417 4.37235 11.4558 4.11613 11.5474C4.27228 11.5802 4.40301 11.6427 4.5004 11.7331C4.62307 11.8471 4.69016 12.0029 4.69016 12.1915C4.69016 12.4609 4.57389 12.6823 4.36382 12.8352C4.15486 12.9873 3.85534 13.0702 3.48925 13.0702C2.84939 13.0702 2.49302 12.7648 2.39522 12.4914C2.3769 12.4405 2.36887 12.3841 2.36887 12.3394C2.36887 12.2332 2.40451 12.1439 2.47207 12.0814C2.53931 12.0192 2.63451 11.9869 2.74761 11.9869C2.82533 11.9869 2.89225 11.9997 2.95092 12.0292C3.00974 12.0587 3.05785 12.1038 3.09973 12.1646C3.14935 12.2372 3.19619 12.2915 3.2569 12.3282C3.31713 12.3647 3.39437 12.3858 3.50798 12.3858C3.69342 12.3858 3.8147 12.2759 3.8147 12.1334C3.8147 12.047 3.78226 11.984 3.7209 11.9411C3.65761 11.8969 3.55985 11.8716 3.42558 11.8716H3.40685C3.30795 11.8716 3.22859 11.8441 3.1739 11.7905C3.11916 11.7368 3.09366 11.6616 3.09366 11.5753C3.09366 11.4924 3.11937 11.4179 3.17378 11.364C3.22823 11.3101 3.30745 11.2809 3.40685 11.2809H3.42558C3.54389 11.2809 3.63283 11.255 3.69126 11.2123C3.74841 11.1705 3.77911 11.1107 3.77911 11.0341C3.77911 10.9598 3.75194 10.9019 3.70443 10.8619C3.65624 10.8214 3.58381 10.7967 3.48925 10.7967C3.41343 10.7967 3.35069 10.8121 3.29851 10.8418C3.24639 10.8715 3.20271 10.9168 3.16682 10.9798C3.12025 11.0623 3.06988 11.1219 3.00589 11.1605C2.94171 11.1991 2.86754 11.2143 2.77758 11.2143C2.66225 11.2143 2.57171 11.1804 2.50997 11.1186C2.44832 11.057 2.41944 10.9716 2.41944 10.8768C2.41944 10.8201 2.42781 10.7748 2.44775 10.7189Z' fill='#77757D'/>
</svg>`),
      }[(model as ListBlockModel).type ?? 'bulleted'] ?? ''
    );
  }
  return '';
};

export class DatabaseBlockDatasource extends BaseDataSource {
  private _model: DatabaseBlockModel;
  private _batch = 0;

  get page() {
    return this._model.page;
  }

  constructor(
    private root: BlockSuiteRoot,
    config: DatabaseBlockDatasourceConfig
  ) {
    super();
    this._model = root.page.workspace
      .getPage(config.pageId)
      ?.getBlockById(config.blockId) as DatabaseBlockModel;
    this._model.childrenUpdated.pipe(this.slots.update);
  }

  public get rows(): string[] {
    return this._model.children.map(v => v.id);
  }

  public get properties(): string[] {
    return [...this._model.columns.map(column => column.id)];
  }

  public slots = {
    update: new Slot(),
  };

  private _runCapture() {
    if (this._batch) {
      return;
    }

    this._batch = requestAnimationFrame(() => {
      this.page.captureSync();
      this._batch = 0;
    });
  }

  public cellChangeValue(
    rowId: string,
    propertyId: string,
    value: unknown
  ): void {
    this._runCapture();

    const type = this.propertyGetType(propertyId);
    if (type === 'title' && typeof value === 'string') {
      const text = this.getModelById(rowId)?.text;
      if (text) {
        text.replace(0, text.length, value);
      }
      this.slots.update.emit();
      return;
    } else if (type === 'rich-text' && typeof value === 'string') {
      const cell = this._model.getCell(rowId, propertyId);
      const yText = cell?.value as Y.Text | undefined;
      if (yText) {
        const text = new Text(yText);
        text.replace(0, text.length, value);
      }
      return;
    }
    if (this._model.columns.find(v => v.id === propertyId)) {
      this._model.updateCell(rowId, {
        columnId: propertyId,
        value,
      });
      this._model.applyColumnUpdate();
    }
  }

  public cellGetValue(rowId: string, propertyId: string): unknown {
    if (propertyId === 'type') {
      const model = this.getModelById(rowId);
      if (!model) {
        return;
      }
      return getIcon(model);
    }
    const type = this.propertyGetType(propertyId);
    if (type === 'title') {
      const model = this.getModelById(rowId);
      if (model) {
        return model.text?.toString();
      }
      return;
    }
    return this._model.getCell(rowId, propertyId)?.value;
  }

  override cellGetExtra(rowId: string, propertyId: string): unknown {
    if (this.propertyGetType(propertyId) === 'title') {
      const model = this.getModelById(rowId);
      if (model) {
        return {
          result: this.root.renderModel(model),
          model,
        };
      }
    }
    return super.cellGetExtra(rowId, propertyId);
  }

  private getModelById(rowId: string): BaseBlockModel | undefined {
    return this._model.children[this._model.childMap.get(rowId) ?? -1];
  }

  public override cellGetRenderValue(
    rowId: string,
    propertyId: string
  ): unknown {
    return this.cellGetValue(rowId, propertyId);
  }

  private newColumnName() {
    let i = 1;
    while (this._model.columns.find(column => column.name === `Column ${i}`)) {
      i++;
    }
    return `Column ${i}`;
  }

  public propertyAdd(insertPosition: InsertPosition, type?: string): string {
    this.page.captureSync();
    return this._model.addColumn(
      insertPosition,
      columnManager
        .getColumn(type ?? multiSelectPureColumnConfig.type)
        .create(this.newColumnName())
    );
  }

  public propertyChangeData(
    propertyId: string,
    data: Record<string, unknown>
  ): void {
    this.page.captureSync();
    this._model.updateColumn(propertyId, () => ({ data }));
    this._model.applyColumnUpdate();
  }

  public propertyChangeName(propertyId: string, name: string): void {
    this.page.captureSync();
    this._model.updateColumn(propertyId, () => ({ name }));
    this._model.applyColumnUpdate();
  }

  public propertyChangeType(propertyId: string, toType: string): void {
    const currentType = this.propertyGetType(propertyId);
    const currentData = this.propertyGetData(propertyId);
    const rows = this.rows;
    const currentCells = rows.map(rowId =>
      this.cellGetValue(rowId, propertyId)
    );
    const result = columnManager
      .getColumn(currentType)
      ?.convertCell(toType, currentData, currentCells) ?? {
      column: columnManager.getColumn(toType).defaultData(),
      cells: currentCells.map(() => undefined),
    };
    this.page.captureSync();
    this._model.updateColumn(propertyId, () => ({
      type: toType,
      data: result.column,
    }));
    const cells: Record<string, unknown> = {};
    currentCells.forEach((value, i) => {
      if (value != null || result.cells[i] != null) {
        cells[rows[i]] = result.cells[i];
      }
    });
    this._model.updateCells(propertyId, cells);
    this._model.applyColumnUpdate();
  }

  public propertyDelete(id: string): void {
    this.page.captureSync();
    const index = this._model.findColumnIndex(id);
    if (index < 0) return;

    this.page.transact(() => {
      this._model.columns.splice(index, 1);
    });
    this._model.applyColumnUpdate();
  }

  public propertyGetData(propertyId: string): Record<string, unknown> {
    return this._model.columns.find(v => v.id === propertyId)?.data ?? {};
  }

  public override propertyGetReadonly(propertyId: string): boolean {
    if (propertyId === 'type') return true;
    return false;
  }

  public propertyGetName(propertyId: string): string {
    if (propertyId === 'type') {
      return 'Block Type';
    }
    return this._model.columns.find(v => v.id === propertyId)?.name ?? '';
  }

  public propertyGetType(propertyId: string): string {
    if (propertyId === 'type') {
      return 'image';
    }
    return this._model.columns.find(v => v.id === propertyId)?.type ?? '';
  }

  public propertyDuplicate(columnId: string): string {
    this.page.captureSync();
    const currentSchema = this._model.getColumn(columnId);
    assertExists(currentSchema);
    const { id: copyId, ...nonIdProps } = currentSchema;
    const schema = { ...nonIdProps };
    const id = this._model.addColumn(
      {
        before: false,
        id: columnId,
      },
      schema
    );
    this._model.copyCellsByColumn(copyId, id);
    this._model.applyColumnUpdate();
    return id;
  }

  public rowAdd(insertPosition: InsertPosition): string {
    this.page.captureSync();
    const index = insertPositionToIndex(insertPosition, this._model.children);
    return this.page.addBlock('affine:paragraph', {}, this._model.id, index);
  }

  public rowDelete(ids: string[]): void {
    this.page.captureSync();
    this.page.updateBlock(this._model, {
      children: this._model.children.filter(v => !ids.includes(v.id)),
    });
  }

  public override captureSync(): void {
    this.page.captureSync();
  }

  public override propertyGetDefaultWidth(propertyId: string): number {
    if (this.propertyGetType(propertyId) === 'title') {
      return 260;
    }
    return super.propertyGetDefaultWidth(propertyId);
  }

  override onCellUpdate(
    rowId: string,
    propertyId: string,
    callback: () => void
  ): Disposable {
    if (this.propertyGetType(propertyId) === 'title') {
      this.getModelById(rowId)?.text?.yText.observe(callback);
      return {
        dispose: () => {
          this.getModelById(rowId)?.text?.yText.unobserve(callback);
        },
      };
    }
    return this._model.propsUpdated.on(callback);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get allPropertyConfig(): ColumnConfig<any, any>[] {
    return [
      dateColumnConfig,
      numberColumnConfig,
      progressColumnConfig,
      selectColumnConfig,
      multiSelectColumnConfig,
      richTextColumnConfig,
      linkColumnConfig,
      checkboxColumnConfig,
    ];
  }

  public override propertyGetMain(): string | undefined {
    return this._model.columns.find(v => v.type === 'title')?.id;
  }
}

export const hiddenColumn = [titleColumnConfig, imageColumnConfig];
