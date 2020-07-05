import { mapFromAddLabelModel, mapFromUpdateLabelModel, mapToGetLabelModel } from './labelMappers';

describe('test labelMappers', () => {
  const mockLabel = {
    labelId: 1,
    label: 'foobar',
    statusCode: 'InUse',
  };

  describe('test mapToGetLabelModel', () => {
    it('should map label to getLabelModel', () => {
      const getLabelModel = mapToGetLabelModel(mockLabel);

      expect(getLabelModel).toEqual(getLabelModel);
    });
  });

  describe('test mapFromAddLabelModel', () => {
    it('should map addLabelModel to label', () => {
      const mockAddLabelModel = {
        label: 'foobar',
      };

      const label = mapFromAddLabelModel(mockAddLabelModel);

      expect(label).toEqual({
        labelId: 0,
        ...mockAddLabelModel,
        statusCode: 'InUse',
      });
    });
  });

  describe('test mapFromUpdateLabelModel', () => {
    it('should map label to updateLabelModel', () => {
      const updateLabelModel = mapFromUpdateLabelModel(1, mockLabel);

      expect(updateLabelModel).toEqual(updateLabelModel);
    });
  });
});
