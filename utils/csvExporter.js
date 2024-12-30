const fs = require('fs');
const path = require('path');
const os = require('os');
const { Parser } = require('json2csv');

exports.exportToCSV = async (data, fileName) => {
  // Format the 'created_at' field to 'YYYY-MM-DD' without using a library
  const formattedData = data.map(item => {
    const date = new Date(item.created_at);
    item.created_at = date.toISOString().split('T')[0];  // Extract only the date part (YYYY-MM-DD)
    return item;
  });

  const fields = ['id', 'driver_id', 'rider_id', 'pickup_location', 'dropoff_location', 'fare', 'status', 'created_at'];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(formattedData);

  // Get the Downloads folder path
  const downloadsDir = path.join(os.homedir(), 'Downloads');

  // Ensure the Downloads directory exists
  if (!fs.existsSync(downloadsDir)) {
    throw new Error('Downloads folder not found.');
  }

  // Get the current date in 'YYYY-MM-DD' format
  const timestamp = new Date();
  const formattedDate = timestamp.toISOString().split('T')[0];  // This gives 'YYYY-MM-DD'

  // Generate two random digits
  const randomDigits = Math.floor(10 + Math.random() * 90);  // Generates a random number between 10 and 99

  // Combine the formatted date and the random digits
  const uniqueFileName = `rides_${formattedDate}_${randomDigits}.csv`;
  const filePath = path.join(downloadsDir, uniqueFileName);

  // Write the CSV file to the Downloads folder
  fs.writeFileSync(filePath, csv);
  console.log(`File successfully saved to ${filePath}`);

  return filePath;
};
