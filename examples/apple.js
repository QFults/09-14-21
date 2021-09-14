const { Sequelize, Model, DataTypes } = require('sequelize')
const { prompt } = require('inquirer')
require('console.table')

const sequelize = new Sequelize('mysql://root:rootroot@localhost:3306/apple_db')

class Phone extends Model { }

Phone.init({
  name: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  model: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: null
  }
}, { sequelize, modelName: 'phone' })

class Tablet extends Model { }

Tablet.init({
  name: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  model: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  size: {
    type: DataTypes.INTEGER,
    defaultValue: null
  }
}, { sequelize, modelName: 'tablet' })

class Laptop extends Model { }

Laptop.init({
  name: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  model: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  storage: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  size: {
    type: DataTypes.INTEGER,
    defaultValue: null
  }
}, { sequelize, modelName: 'laptop' })

const DB = { Phone, Tablet, Laptop }

const viewProduct = Product => {
  Product.findAll()
    .then(data => data.map(({ dataValues }) => dataValues))
    .then(products => {
      console.table(products)
      main()
    })
}

// const addProduct = Product => {
//   Product.findAll()
//     .then(products => prompt)
// }

const createProduct = Product => {
  const { dataValues: template } = new Product()
  const questions = []
  for (const value in template) {
    if (Object.hasOwnProperty.call(template, value)) {
      const prop = template[value];
      if (value !== 'id') {
        questions.push({
          type: 'input',
          name: value,
          message: `Enter the ${value}:`
        })
      }
    }
  }
  prompt(questions)
    .then(product => Product.create(product))
    .then(() => {
      console.log('Product created!')
      main()
    })
    .catch(err => console.log(err))
}

const modifyProduct = Product => {
  Product.findAll()
    .then(products => prompt({
      type: 'list',
      name: 'id',
      message: 'Select a product:',
      choices: products.map(({ dataValues: product }) => ({ name: product.name, value: product.id }))
    }))
    .then(({ id }) => {
      const { dataValues: template } = new Product()
      const props = []
      for (const value in template) {
        if(value !== 'id') {
          props.push(value)
        }
      }
      prompt({
        type: 'list',
        name: 'property',
        message: 'What would you like to modify?',
        choices: props
      })
        .then(({ property }) => {
          prompt({
            type: 'input',
            name: 'value',
            message: `Enter new value for ${property}`
          })
            .then(({ value }) => Product.update({ [property]: value }, { where: { id } }))
            .then(() => {
              console.log('Item updated!')
              main()
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

const removeProduct = Product => {
  Product.findAll()
    .then(products => prompt({
      type: 'list',
      name: 'id',
      message: 'Select a product:',
      choices: products.map(({ dataValues: product }) => ({ name: product.name, value: product.id }))
    }))
      .then(({ id }) => Product.destroy({ where: { id } }))
      .then(() => {
        console.log('Product Deleted!')
        main()
      })
      .catch(err => console.log(err))
}

const chooseType = action => {
  prompt({
    type: 'list',
    name: 'type',
    message: 'Which type of device?',
    choices: ['Phone', 'Tablet', 'Laptop']
  })
    .then(({ type }) => {
      const Product = DB[type]
      switch (action) {
        case 'View':
          viewProduct(Product)
          break
        case 'Add':
          addProduct(Product)
          break
        case 'Create':
          createProduct(Product)
          break
        case 'Modify':
          modifyProduct(Product)
          break
        case 'Remove':
          removeProduct(Product)
          break
      }
    })
}

const main = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View', 'Add', 'Create', 'Modify', 'Remove', 'EXIT']
  })
    .then(({ action }) => action === 'EXIT' ? process.exit() : chooseType(action))
    .catch(err => console.log(err))
}

sequelize.sync()
  .then(() => main())
  .catch(err => console.log(err))