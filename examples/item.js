const { Sequelize, Model, DataTypes, Op } = require('sequelize')
const sequelize = new Sequelize('mysql://root:rootroot@localhost:3306/todo_db')

class Item extends Model { }

Item.init({
  // id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   primaryKey: true,
  //   autoIncrement: true
  // }
  // x: {
  //   type: DataTypes.INTEGER,
  //   defaultValue: Math.random()
  // },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Take out trash',
    unique: true
  },
  isDone: DataTypes.BOOLEAN
}, { sequelize, modelName: 'item' })

sequelize.sync()

// Item.findOne({ where: { id: 2 } })
//   .then(item => {
//     console.log(item)
//   })
//   .catch(err => console.log(err))

// Item.findAll({
//   attributes: ['text', 'isDone'],
//   where: {
//     [Op.and]: [
//       { text: 'Take out trash' },
//       { isDone: true }
//     ]
//     // text: 'Take out trash'
//   }
// })
  // .then(items => {
  //   console.log(items)
  // })
  // .catch(err => console.log(err))

// Item.create({
//   text: 'Take out trash',
//   isDone: false
// })
//   .then(item => {
//     console.log(item)
//   })
//   .catch(err => console.log(err))

// Item.update({ isDone: true, text: 'Something else' }, { where: { id: 1 } })
//   .then(() => {
//     console.log('updated!')
//   })
//   .catch(err => console.log(err))

// Item.destroy({ where: { id: 1 } })
//   .then(() => {
//     console.log('DESTROYED! MUAHAHAHAHA!')
//   })
//   .catch(err => console.log(err))
