import DataType from 'sequelize';
import Model from '../sequelize';

const Question = Model.define('Question', {
  qID: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  sID: {
    type: DataType.INTEGER,
  },

  questiontext: {
    type: DataType.STRING(255),
  },
});

export default Question;
