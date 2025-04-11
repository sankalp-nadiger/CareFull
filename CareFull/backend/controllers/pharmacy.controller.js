export const registerPharmacist = async (req, res) => {
  const { name, email, password, location, suppliers } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
  try {
    const existing = await Pharmacy.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPharmacy = new Pharmacy({
      name,
      email,
      password: hashedPassword,
      location,
      suppliers: suppliers || []
    });

    await newPharmacy.save();

    const token = jwt.sign({ id: newPharmacy._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'Pharmacist registered successfully',
      token,
      pharmacist: {
        id: newPharmacy._id,
        name: newPharmacy.name,
        email: newPharmacy.email,
        location: newPharmacy.location,
        suppliers: newPharmacy.suppliers
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};
export const loginPharmacist = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pharmacist = await Pharmacy.findOne({ email });
    if (!pharmacist) return res.status(404).json({ error: 'Email not found' });

    const isMatch = await bcrypt.compare(password, pharmacist.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: pharmacist._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      pharmacist: {
        id: pharmacist._id,
        name: pharmacist.name,
        email: pharmacist.email,
        location: pharmacist.location,
        suppliers: pharmacist.suppliers
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};