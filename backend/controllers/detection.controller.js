import Detection from "../models/detection.model.js";
import { getGridFSBucket } from "../utils/gridfs.js";
import { Readable } from "stream";
import mongoose from "mongoose";

// Backend: Get location density data
export const getLocationDensity = async (req, res) => {
  // USA States
  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  // Malaysia States
  const malaysiaStates = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Malacca",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Perlis",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "Kuala Lumpur",
    "Putrajaya",
    "Labuan",
  ];
  const russiaStates = [
    "Москва", // Moscow
    "Санкт-Петербург", // Saint Petersburg
    "Новосибирская область", // Novosibirsk Oblast
    "Свердловская область", // Sverdlovsk Oblast
    "Красноярский край", // Krasnoyarsk Krai
    "Приморский край", // Primorsky Krai
    "Республика Татарстан", // Republic of Tatarstan
    "Челябинская область", // Chelyabinsk Oblast
    "Республика Башкортостан", // Bashkortostan
    "Республика Саха (Якутия)", // Sakha Republic (Yakutia)
    "Иркутская область", // Irkutsk Oblast
    "Хабаровский край", // Khabarovsk Krai
    "Нижегородская область", // Nizhny Novgorod Oblast
    "Ростовская область", // Rostov Oblast
    "Омская область", // Omsk Oblast
    "Самарская область", // Samara Oblast
    "Краснодарский край", // Krasnodar Krai
    "Томская область", // Tomsk Oblast
    "Калининградская область", // Kaliningrad Oblast
    "Мурманская область" // Murmansk Oblast
  ];
  
  
  // China Provinces
  const chinaProvinces = [
    "新疆维吾尔自治区",
    "西藏自治区",
    "内蒙古自治区",
    "青海省",
    "四川省",
    "黑龙江省",
    "甘肃省",
    "云南省",
    "广西壮族自治区",
    "湖南省",
    "浙江省",
    "广东省",
    "福建省",
    "河北省",
    "湖北省",
    "贵州省",
    "山东省",
    "江西省",
    "河南省",
    "澳门特别行政区",
    "香港特别行政区",
    "上海市",
    "北京市",
    "台湾省",
    "海南省",
    "重庆市",
  ];

  // World Countries
  const worldCountries = [
    "USA",
    "Malaysia",
    "China",
    "India",
    "Brazil",
    "Germany",
    "France",
    "Japan",
    "United Kingdom",
    "Russia",
    "Australia",
    "Canada",
    "South Africa",
    "Mexico",
    "Indonesia",
    "Saudi Arabia",
    "Argentina",
    "South Korea",
    "Italy",
    "Spain",
    "Turkey",
    "Netherlands",
    "Sweden",
    "Poland",
    "Switzerland",
  ];

  // Hardcoded densities for some key locations
  const densityData = {
    California: 0.07,
    Texas: 0.04,
    "New York": 0.09,
    Florida: 0.05,
    Illinois: 0.06,
    Ohio: 0.03,
    Selangor: 0.08,
    "Kuala Lumpur": 0.12,
    Beijing: 0.1,
    Shanghai: 0.09,
    Guangdong: 0.07,
    Malaysia: 0.11,
    China: 0.13,
    World: 0.15,
  };

  // Generate random densities for remaining USA states
  usStates.forEach((state) => {
    if (!densityData[state]) {
      densityData[state] = (Math.random() * 0.08 + 0.01).toFixed(2); // 0.01 - 0.09
    }
  });

  // Generate random densities for Malaysia states
  malaysiaStates.forEach((state) => {
    if (!densityData[state]) {
      densityData[state] = (Math.random() * 0.12 + 0.02).toFixed(2); // 0.02 - 0.14
    }
  });

  // Generate random densities for Malaysia states
  russiaStates.forEach((state) => {
    if (!densityData[state]) {
      densityData[state] = (Math.random() * 0.11 + 0.02).toFixed(2); 
    }
  });
  // Generate random densities for China provinces
  chinaProvinces.forEach((province) => {
    if (!densityData[province]) {
      densityData[province] = (Math.random() * 0.1 + 0.03).toFixed(2); // 0.03 - 0.13
    }
  });

  // Generate random densities for World countries
  worldCountries.forEach((country) => {
    if (!densityData[country]) {
      densityData[country] = (Math.random() * 0.15 + 0.05).toFixed(2); // 0.05 - 0.2
    }
  });

  try {
    res.json(densityData);
  } catch (error) {
    console.error("Error fetching location density data:", error);
    res.status(500).json({ message: "Failed to fetch location density data" });
  }
};

// Backend: Get all detection data
// export const getDetectionData = async (req, res) => {
//   try {
//     const detections = await Detection.find();
//     res.status(200).json(detections);
//   } catch (error) {
//     console.error("Error fetching detection data:", error);
//     res.status(500).json({ message: "Failed to fetch detection data" });
//   }
// };
export const getDetectionData = async (req, res) => {
  try {
    const { page, limit, date } = req.query;

    // If a specific date is requested, filter by that date
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const detections = await Detection.find({
        timestamp: { $gte: start, $lt: end }
      })
        .sort({ createdAt: -1 })
        .lean();

      return res.status(200).json(detections);
    }

    // Handle pagination
    if (page && limit) {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const [detections, total] = await Promise.all([
        Detection.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .lean(),
        Detection.countDocuments()
      ]);

      return res.status(200).json({
        data: detections,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total
      });
    }

    // Default: return recent detections with optional limit
    const fallbackLimit = parseInt(limit) || 1000;
    const detections = await Detection.find()
      .sort({ createdAt: -1 })
      .limit(fallbackLimit)
      .lean();

    res.status(200).json(detections);
  } catch (error) {
    console.error("Error fetching detection data:", error);
    res.status(500).json({ 
      message: "Failed to fetch detection data",
      error: error.message 
    });
  }
};


export const getDetectionFiles = async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id); // Correctly create ObjectId
    const bucket = getGridFSBucket();

    const downloadStream = bucket.openDownloadStream(fileId);
    
    res.setHeader('Content-Type', 'audio/mpeg'); // Ensure correct MIME type

    downloadStream.pipe(res);

    downloadStream.on('error', (err) => {
      console.error("Error streaming the file:", err);
      res.status(500).json({ message: "Error fetching file" });
    });

  } catch (error) {
    console.error("Error in getFile:", error);
    res.status(500).json({ message: "Error fetching file", error: error.message });
  }
};

// Save Detection Data with File Uploads
export const saveDetectionData = async (req, res) => {
  try {
    console.log("Received detection data:", req.body);
    console.log("Received files:", req.files);

    let {
      timestamp,
      object_detected,
      object_detected_count,
      confidence_audio,
      confidence_camera,
      device_code,
      location,
      audio_detected,
      camera_detected
    } = req.body;

    // ✅ Fix timestamp: Remove whitespace and convert to Date
    if (timestamp) {
      timestamp = timestamp.trim();  // Remove leading/trailing spaces
      timestamp = new Date(timestamp);  // Convert to Date object
      if (isNaN(timestamp.getTime())) {
        return res.status(400).json({ message: "Invalid timestamp format" });
      }
    } else {
      return res.status(400).json({ message: "Timestamp is required" });
    }

    // Ensure location is correctly parsed
    const parsedLocation = location ? {
      latitude: parseFloat(location.latitude),
      longitude: parseFloat(location.longitude)
    } : null;

    const gridFSBucket = getGridFSBucket(); // Get GridFSBucket instance

    let soundFileId = null;
    let imageFileId = null;

    // Upload sound file if available
    if (req.files && req.files["sound_file"] && req.files["sound_file"][0]) {
      const soundBuffer = req.files["sound_file"][0].buffer;
      const soundStream = Readable.from(soundBuffer);

      await new Promise((resolve, reject) => {
        const uploadStream = gridFSBucket.openUploadStream(req.files["sound_file"][0].originalname);
        soundStream.pipe(uploadStream)
          .on('error', reject)
          .on('finish', () => {
            soundFileId = uploadStream.id;
            resolve();
          });
      });
    }

    // Upload image file if available
    if (req.files && req.files["image_file"] && req.files["image_file"][0]) {
      const imageBuffer = req.files["image_file"][0].buffer;
      const imageStream = Readable.from(imageBuffer);

      await new Promise((resolve, reject) => {
        const uploadStream = gridFSBucket.openUploadStream(req.files["image_file"][0].originalname);
        imageStream.pipe(uploadStream)
          .on('error', reject)
          .on('finish', () => {
            imageFileId = uploadStream.id;
            resolve();
          });
      });
    }
    // Save detection data in MongoDB
    const newDetection = new Detection({
      timestamp,
      object_detected,
      object_detected_count,
      confidence_audio,
      confidence_camera,
      device_code,
      location: parsedLocation,
      audio_detected,
      camera_detected,
      sound_file: soundFileId,
      image_file: imageFileId
    });

    const savedData = await newDetection.save();
    res.status(201).json({
      message: "Detection data saved successfully",
      data: savedData,
    });

  } catch (error) {
    console.error("Error saving detection data:", error);
    res.status(500).json({
      message: "Failed to save detection data",
      error: error.message,
    });
  }
};


