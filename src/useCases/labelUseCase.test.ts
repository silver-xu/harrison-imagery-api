import { LabelStatusCodes } from '../domains/label';
import { NotFoundError } from '../errors/notFound';
import { labelRepository } from '../infra/database';
import { mapFromAddLabelModel, mapFromUpdateLabelModel, mapToGetLabelModel } from '../mappers/labelMappers';
import { addLabel, deleteLabel, getLabel, listLabels, updateLabel } from './labelUseCase';

jest.mock('../infra/database');

describe('test labelUseCase', () => {
  const mockedLabelRepository = labelRepository as jest.Mocked<typeof labelRepository>;

  const mockLabel = {
    labelId: 1,
    label: 'foobar',
    statusCode: 'InUse',
  };

  const mockUpdateLabelModel = {
    label: 'foobar',
    statusCode: LabelStatusCodes.InUse,
  };

  const mockGetLabelModel = mapToGetLabelModel(mapFromUpdateLabelModel(1, mockUpdateLabelModel));

  describe('test listLabels', () => {
    it('should return getLabelModels', async () => {
      mockedLabelRepository.getAll.mockResolvedValue([mockLabel]);
      const labels = await listLabels();
      expect(labels).toEqual([mockLabel]);
    });
  });

  describe('test getLabel', () => {
    it('should throw NotFoundError if labelRepository.getById is returning undefined', async () => {
      mockedLabelRepository.getById.mockResolvedValue(undefined);

      await expect(getLabel(1)).rejects.toEqual(new NotFoundError('Label was not found'));
    });

    it('should return getLabelModel if labelRepository.getById is returning label', async () => {
      mockedLabelRepository.getById.mockResolvedValue(mockLabel);
      const label = await getLabel(1);
      expect(label).toEqual(mockLabel);
    });
  });

  describe('test addLabel', () => {
    it('should map and pass addLabelModel to labelRepository.add', async () => {
      mockedLabelRepository.add.mockResolvedValue(1);

      const addLabelModel = {
        label: 'foobar',
      };

      const label = await addLabel(addLabelModel);

      expect(mockedLabelRepository.add).toHaveBeenLastCalledWith(mapFromAddLabelModel(addLabelModel));
      expect(label).toEqual({
        labelId: 1,
        statusCode: 'InUse',
        ...addLabelModel,
      });
    });
  });

  describe('test deleteLabel', () => {
    it('should throw NotFoundError if labelRepository.getById is returning undefined', async () => {
      mockedLabelRepository.getById.mockResolvedValue(undefined);

      await expect(deleteLabel(1)).rejects.toEqual(new NotFoundError('Label was not found'));
    });

    it('should call labelRepository.delete if labelRepository.getById is returning label', async () => {
      mockedLabelRepository.getById.mockResolvedValue(mockLabel);

      await deleteLabel(1);

      expect(mockedLabelRepository.delete).toHaveBeenLastCalledWith(1);
    });
  });

  describe('test updateLabel', () => {
    it('should throw NotFoundError if labelRepository.getById is returning undefined', async () => {
      mockedLabelRepository.getById.mockResolvedValue(undefined);

      await expect(updateLabel(1, mockUpdateLabelModel)).rejects.toEqual(new NotFoundError('Label was not found'));
    });

    it('should call labelRepository.update if labelRepository.getById is returning label', async () => {
      mockedLabelRepository.getById.mockResolvedValue(mockLabel);

      const result = await updateLabel(1, mockUpdateLabelModel);

      expect(mockedLabelRepository.update).toHaveBeenLastCalledWith(mapFromUpdateLabelModel(1, mockUpdateLabelModel));
      expect(result).toEqual(mockGetLabelModel);
    });
  });
});
