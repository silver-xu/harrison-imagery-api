import { imageLabelRepository } from './infra/database';
import { getLabelledImages } from './useCases/labelUseCase';

(async () => {
  console.log('done');

  const getLabelledImagesModel = await getLabelledImages(2);
  console.log(JSON.stringify(getLabelledImagesModel));
})();
