const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isConnected, store } = require('../config/fallbackStore');

exports.signup = async (req, res) => {
    const { employeeID, firstName, lastName, email, phone, password, confirmPassword } = req.body;
    console.log(req.body);
    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Fallback in-memory handling
        if (!isConnected()) {
            const existingUser = store.users.find(u => 
                u.employeeID === employeeID || u.email === email || u.phone === phone
            );
            if (existingUser) {
                return res.status(400).json({ error: 'User with these details already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                _id: 'user_' + Date.now(),
                employeeID,
                firstName,
                lastName,
                email,
                phone,
                password: hashedPassword
            };
            store.users.push(newUser);
            console.log('[Fallback Seed] User saved successfully:', email);
            return res.status(201).json({ message: 'User created successfully' });
        }

        const existingUser = await User.findOne({
            $or: [
                { employeeID },
                { email },
                { phone }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User with these details already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            employeeID,
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();
        console.log('User saved successfully');
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error('Signup Error:', error); 
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

exports.login = async (req, res) => {
  const { loginID, password } = req.body;

  try {
      // Fallback in-memory handling
      if (!isConnected()) {
          const user = store.users.find(u => 
              u.email === loginID || u.phone === loginID || u.employeeID === loginID
          );
          if (!user) {
              return res.status(400).json({ error: 'User not found' });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              return res.status(400).json({ error: 'Invalid credentials' });
          }

          return res.status(200).json({ message: 'Login successful', user });
      }

      const user = await User.findOne({ $or: [{ email: loginID }, { phone: loginID }] });
      
      if (!user) {
          return res.status(400).json({ error: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          return res.status(400).json({ error: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
};

