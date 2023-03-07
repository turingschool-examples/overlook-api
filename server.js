const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3001;
const app = express();
const customers = require('./data/customers');
const rooms = require('./data/rooms');
const bookings = require('./data/bookings');

app.locals = {
  title: 'Overlook API',
  customers,
  rooms,
  bookings,
}

app.use(cors());
app.use(express.json());

const isValidDate = dateString => {
  var regEx = /^\d{4}[\/](0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])$/;
  return regEx.test(dateString);
}

app.get('/api/v1/customers', (req, res) => {
  const { customers } = app.locals;
  res.status(200).json({ customers });
});

app.get('/api/v1/customers/:id', (req, res) => {
  const { id } = req.params;
  const { customers } = app.locals;

  let requestedCustomer = customers.find(customer => customer.id == id);

  if (!requestedCustomer) {
    return res.status(404).json({
      message: `No customer found with an id of ${id}`
    });
  }

  res.status(200).json(requestedCustomer);
});

app.get('/api/v1/rooms', (req, res) => {
  const { rooms } = app.locals;
  res.status(200).json({ rooms });
});

app.get('/api/v1/bookings', (req, res) => {
  const { bookings } = app.locals;
  res.status(200).json({ bookings });
});

app.post('/api/v1/bookings', (req, res) => {
  const { userID, date, roomNumber } = req.body;
  const requiredProperties = ['userID', 'date', 'roomNumber'];

  for (let requiredParameter of requiredProperties) {
    if (req.body[requiredParameter] === undefined) {
      return res.status(422).json({
        message: `You are missing a required parameter of ${requiredParameter}`
      });
    }
  }

    // Check for valid date
    if (!isValidDate(date)) {
      return res.status(422).json({
        message: `Invalid date format submitted.  Date must be in YYYY/MM/DD format.`
      })
    }

    // Check that the userID is a number
    if (typeof userID !== 'number') {
      return res.status(422).json({
        message: `Invalid userID data type. userID must be a number.`
      })
    }

    // Check that the roomNumber is a number
    if (typeof roomNumber !== 'number') {
      return res.status(422).json({
        message: `Invalid roomNumber data type. roomNumber must be a number.`
      })
    }

    // Does the user exist?
    if (userID > 50 || userID < 1) {
      return res.status(422).json({
        message: `No user found with ID of ${userID}`
      });
    }

    const newId = String(Date.now());

    app.locals.bookings.push({ id: newId, userID, date, roomNumber })
    res.status(201).json({ 
      message: `Booking with id ${newId} successfully posted`,
      newBooking: {
        id: newId, 
        userID,
        date,
        roomNumber
      }
    });
})

app.delete('/api/v1/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { bookings } = app.locals;

  const bookingToDelete = bookings.find(booking => booking.id === id);

  if (!bookingToDelete) {
    return res.status(404).json({
      message: `No found trip with id of #${id}.`
    })
  }

  app.locals.bookings = bookings.filter(trip => trip.id !== id);

  res.status(200).json({
    message: `Booking #${id} has been deleted`
  })
});

app.listen(port, () => {
  console.log(`${app.locals.title} is now running on http://localhost:${port} !`)
});

module.exports = app;