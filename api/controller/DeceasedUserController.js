import DeceasedUser from "../models/DeceasedUser.js";
import Memento from "../models/Memento.js";
import Album from "../models/album.js";
import Photo from "../models/Photo.js";
import Pet from "../models/Pet.js";
import Place from "../models/Place.js";
import cloudinary from "cloudinary";

const addPhotosToAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Find the existing album
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    // Save each photo and add it to the album
    for (const file of req.files) {
      const photoUrl = await uploadImage(file);

      const photo = new Photo({
        photoUrl,
        deceasedUser: album.deceasedUser,
        albumId: album._id, // Reference the album by its ObjectId
        content: album.title,
        date: album.albumDate,
        type: "Photo Album",
        albumTitle: album.title,
      });

      await photo.save();
      album.photos.push(photo._id); // Add the photo to the album's photos array
    }

    // Save the album with the new photos
    await album.save();

    res
      .status(200)
      .json({ message: "Photos added to album", albumId: album._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add photos to album" });
  }
};

const getAllAlbums = async (req, res) => {
  const deceasedUserId = req.params.deceasedUserId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const deceasedUser = await DeceasedUser.findById(deceasedUserId);
    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    const totalAlbumsCount = deceasedUser.albums.length;
    const albumIds = deceasedUser.albums.slice(skip, skip + limit);

    const albums = await Album.find({ _id: { $in: albumIds } })
      .sort({ createdAt: -1 })
      .populate({
        path: "photos",
        options: { sort: { createdAt: -1 } },
      });

    if (!albums || albums.length === 0) {
      return res.status(404).json({ message: "Albums not found" });
    }

    res.status(200).json({
      count: totalAlbumsCount,
      pages: Math.ceil(totalAlbumsCount / limit),
      currentPage: page,
      albums,
      deceasedUser: {
        firstName: deceasedUser.firstName,
        lastName: deceasedUser.lastName,
        birthDate: deceasedUser.birthDate,
        deathDate: deceasedUser.deathDate,
        profilePhotoUrl: deceasedUser.profilePhotoUrl,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get albums" });
  }
};

//Get request to fetch all photos associated with a deceased user
const getAllPhotos = async (req, res) => {
  const deceasedUserId = req.params.deceasedUserId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const deceasedUser = await DeceasedUser.findById(deceasedUserId);
    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    const totalPhotosCount = deceasedUser.photos.length;
    const photos = await Photo.find({ _id: { $in: deceasedUser.photos } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    if (!photos || photos.length === 0) {
      return res.status(404).json({ message: "Photos not found" });
    }

    res.status(200).json({
      count: totalPhotosCount,
      pages: Math.ceil(totalPhotosCount / limit),
      currentPage: page,
      photos,
      deceasedUser: {
        firstName: deceasedUser.firstName,
        lastName: deceasedUser.lastName,
        birthDate: deceasedUser.birthDate,
        deathDate: deceasedUser.deathDate,
        profilePhotoUrl: deceasedUser.profilePhotoUrl,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get photos" });
  }
};

const getAllPets = async (req, res) => {
  const deceasedUserId = req.params.deceasedUserId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const deceasedUser = await DeceasedUser.findById(deceasedUserId);
    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    const totalPetsCount = deceasedUser.pets.length;
    const pets = await Photo.find({ _id: { $in: deceasedUser.pets } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: "Pets not found" });
    }

    res.status(200).json({
      count: totalPetsCount,
      pages: Math.ceil(totalPetsCount / limit),
      currentPage: page,
      pets,
      deceasedUser: {
        firstName: deceasedUser.firstName,
        lastName: deceasedUser.lastName,
        birthDate: deceasedUser.birthDate,
        deathDate: deceasedUser.deathDate,
        profilePhotoUrl: deceasedUser.profilePhotoUrl,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get pets" });
  }
};

const getAllPlaces = async (req, res) => {
  const deceasedUserId = req.params.deceasedUserId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const deceasedUser = await DeceasedUser.findById(deceasedUserId);
    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    const totalPlacesCount = deceasedUser.places.length;
    const placeIds = deceasedUser.places.slice(skip, skip + limit);

    const places = await Place.find({ _id: { $in: placeIds } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate({
        path: "photos",
        options: { limit: 6, sort: { createdAt: -1 } },
      })
      .exec();

    if (!places || places.length === 0) {
      return res.status(404).json({ message: "Places not found" });
    }

    res.status(200).json({
      count: totalPlacesCount,
      pages: Math.ceil(totalPlacesCount / limit),
      currentPage: page,
      places,
      deceasedUser: {
        firstName: deceasedUser.firstName,
        lastName: deceasedUser.lastName,
        birthDate: deceasedUser.birthDate,
        deathDate: deceasedUser.deathDate,
        profilePhotoUrl: deceasedUser.profilePhotoUrl,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get places" });
  }
};

const getAllMementos = async (req, res) => {
  const deceasedUserId = req.params.deceasedUserId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const deceasedUser = await DeceasedUser.findById(deceasedUserId);
    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    const totalMementosCount = deceasedUser.mementos.length;
    const mementos = await Memento.find({ _id: { $in: deceasedUser.mementos } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    if (!mementos || mementos.length === 0) {
      return res.status(404).json({ message: "Mementos not found" });
    }

    res.status(200).json({
      count: totalMementosCount,
      pages: Math.ceil(totalMementosCount / limit),
      currentPage: page,
      mementos,
      deceasedUser: {
        firstName: deceasedUser.firstName,
        lastName: deceasedUser.lastName,
        birthDate: deceasedUser.birthDate,
        deathDate: deceasedUser.deathDate,
        profilePhotoUrl: deceasedUser.profilePhotoUrl,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get mementos" });
  }
};

const getAlbum = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    // Fetch the album without populating the photos
    const album = await Album.findById(req.params.albumId);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    const totalPhotosCount = album.photos.length;

    const photos = await Photo.find({ _id: { $in: album.photos } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    if (!photos || photos.length === 0) {
      return res.status(404).json({ message: "Photos not found" });
    }

    const deceasedUser = await DeceasedUser.findById(album.deceasedUser);
    if (!deceasedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      count: totalPhotosCount,
      pages: Math.ceil(totalPhotosCount / limit),
      currentPage: page,
      album: {
        ...album.toObject(),
        photos, // Include the paginated photos
      },
      deceasedUser: {
        firstName: deceasedUser.firstName,
        lastName: deceasedUser.lastName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get album" });
  }
};

const createAlbum = async (req, res) => {
  try {
    const { title, albumDate } = req.body;
    const deceasedUserId = req.params.deceasedUserId;

    const deceasedUser = await DeceasedUser.findById(deceasedUserId);
    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Create a new album
    const album = new Album({
      title,
      albumDate,
      deceasedUser: deceasedUserId,
    });

    // Save each photo and add it to the album
    for (const file of req.files) {
      const photoUrl = await uploadImage(file);

      const photo = new Photo({
        photoUrl,
        deceasedUser: album.deceasedUser,
        albumId: album._id, // Reference the album by its ObjectId
        content: album.title,
        date: album.albumDate,
        type: "Photo Album",
        albumTitle: album.title,
      });

      await photo.save();
      album.photos.push(photo._id); // Add the photo to the album's photos array
      deceasedUser.photos.push(photo._id);
    }

    // Save the album
    await album.save();
    deceasedUser.albums.push(album._id);
    await deceasedUser.save();

    res.status(200).json({ albumId: album._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create album" });
  }
};

const createPlacePost = async (req, res) => {
  try {
    const deceasedUser = await DeceasedUser.findById(req.params.deceasedUserId);
    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    const place = new Place({
      placeLongitude: req.body.placeLongitude,
      placeLatitude: req.body.placeLatitude,
      type: "Place",
      placeName: req.body.placeName,
      content: req.body.content,
      deceasedUser: req.params.deceasedUserId,
      author: req.body.author,
    });

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const photoUrl = await uploadImage(file);

        const photo = new Photo({
          photoUrl,
          deceasedUser: place.deceasedUser,
          place: place._id, // Reference the place by its ObjectId
          placeName: place.placeName,
          content: req.body.content,
          author: place.author,
          date: req.body.date,
          type: "Photo",
        });

        await photo.save();
        deceasedUser.photos.push(photo._id);
      }
    }

    await place.save();
    deceasedUser.places.push(place._id);
    await deceasedUser.save();

    return res.status(200).json({ _id: place._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create place post" });
  }
};

const createPhotoPost = async (req, res) => {
  try {
    console.log(req.files.length);
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const deceasedUser = await DeceasedUser.findById(req.params.deceasedUserId);
    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    if (
      req.body.placeName &&
      req.body.placeLongitude &&
      req.body.placeLatitude
    ) {
      const place = new Place({
        placeLongitude: req.body.placeLongitude,
        placeLatitude: req.body.placeLatitude,
        type: "Place",
        placeName: req.body.placeName,
        content: req.body.content,
        deceasedUser: req.params.deceasedUserId,
        author: req.body.author,
      });

      for (const file of req.files) {
        const photoUrl = await uploadImage(file);

        const photo = new Photo({
          photoUrl: photoUrl,
          deceasedUser: req.params.deceasedUserId,
          type: "Photo",
          author: req.body.author,
          content: req.body.content,
          date: req.body.date,
          location: req.body.location,
          place: place._id,
          placeName: place.placeName,
        });

        await photo.save();
        deceasedUser.photos.push(photo._id);
      }

      await place.save();
      deceasedUser.places.push(place._id);
      await deceasedUser.save();

      return res.status(200).json({ message: "Photos and place uploaded" });
    } else {
      for (const file of req.files) {
        const photoUrl = await uploadImage(file);

        const photo = new Photo({
          photoUrl: photoUrl,
          deceasedUser: req.params.deceasedUserId,
          type: "Photo",
          author: req.body.author,
          content: req.body.content,
          date: req.body.date,
          location: req.body.location,
        });

        await photo.save();
        deceasedUser.photos.push(photo._id);
      }

      await deceasedUser.save();

      return res.status(200).json({ message: "Photos uploaded" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create photo post" });
  }
};

const createPetPost = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const deceasedUser = await DeceasedUser.findById(req.params.deceasedUserId);
    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    for (const file of req.files) {
      const photoUrl = await uploadImage(file);

      const pet = new Pet({
        photoUrl: photoUrl,
        deceasedUser: req.params.deceasedUserId,
        type: "Pet",
        petName: req.body.petName,
        petType: req.body.petType,
      });

      await pet.save();
      deceasedUser.pets.push(pet._id);
    }

    await deceasedUser.save();

    return res
      .status(200)
      .json({ message: "Uploaded pets and associated with deceased user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create pet post" });
  }
};

const createMementoPost = async (req, res) => {
  try {
    const deceasedUser = await DeceasedUser.findById(req.params.deceasedUserId);
    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    const memento = new Memento({
      content: req.body.content,
      author: req.body.author,
      type: "Memento",
      deceasedUser: req.params.deceasedUserId,
      location: req.body.location,
    });

    await memento.save();
    deceasedUser.mementos.push(memento._id);
    await deceasedUser.save();

    return res.status(200).json({ _id: memento._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create memento post" });
  }
};

const getAllDeceasedUsers = async (req, res) => {
  try {
    const deceasedUsers = await DeceasedUser.find().sort({ createdAt: -1 });
    return res.status(200).json(deceasedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get deceased users" });
  }
};

const getElementCounts = async (req, res) => {
  try {
    const photoCount = await Photo.countDocuments({
      deceasedUser: req.params.deceasedUserId,
    });
    const mementoCount = await Memento.countDocuments({
      deceasedUser: req.params.deceasedUserId,
    });
    const petCount = await Pet.countDocuments({
      deceasedUser: req.params.deceasedUserId,
    });
    const placeCount = await Place.countDocuments({
      deceasedUser: req.params.deceasedUserId,
    });
    const albumCount = await Album.countDocuments({
      deceasedUser: req.params.deceasedUserId,
    });
    const albumTitles = await Album.find({
      deceasedUser: req.params.deceasedUserId,
    }).select("title");

    return res.status(200).json({
      photoCount,
      mementoCount,
      petCount,
      placeCount,
      albumCount,
      albumTitles,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get counts" });
  }
};

const getOneDeceasedUser = async (req, res) => {
  try {
    const deceasedUser = await DeceasedUser.findById(req.params.deceasedUserId)
      .populate({
        path: "photos",
        options: { limit: 6, sort: { createdAt: -1 } },
      })
      .populate({
        path: "mementos",
        options: { limit: 6, sort: { createdAt: -1 } },
      })
      .populate({
        path: "pets",
        options: { limit: 6, sort: { createdAt: -1 } },
      })
      .populate({
        path: "places",
        options: { limit: 6, sort: { createdAt: -1 } },
      })
      .populate({
        path: "albums",
        options: { limit: 6, sort: { createdAt: -1 } },
      })
      .exec();

    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    return res.status(200).json(deceasedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get deceased user" });
  }
};

const getDeceasedUserWallContent = async (req, res) => {
  const { deceasedUserId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  if (!deceasedUserId) {
    return res.status(400).json({ message: "Invalid deceased user ID" });
  }

  try {
    const deceasedUser = await DeceasedUser.findById(deceasedUserId);
    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    // Fetch all content types
    const photos = await Photo.find({ _id: { $in: deceasedUser.photos } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const mementos = await Memento.find({ _id: { $in: deceasedUser.mementos } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const places = await Place.find({ _id: { $in: deceasedUser.places } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const pets = await Pet.find({ _id: { $in: deceasedUser.pets } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    // Merge and sort all content by createdAt
    const allContent = [...photos, ...mementos, ...places, ...pets].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    // Calculate total count for pagination
    const totalCount =
      deceasedUser.photos.length +
      deceasedUser.mementos.length +
      deceasedUser.places.length +
      deceasedUser.pets.length;

    return res.status(200).json({
      content: allContent,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount: totalCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get wall view content" });
  }
};

const uploadImage = async (file) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

  return uploadResponse.url;
};

export default {
  getAllDeceasedUsers,
  getOneDeceasedUser,
  getDeceasedUserWallContent,
  createPhotoPost,
  createMementoPost,
  createPetPost,
  createPlacePost,
  createAlbum,
  getAlbum,
  getAllAlbums,
  addPhotosToAlbum,
  getAllPhotos,
  getAllPets,
  getAllPlaces,
  getAllMementos,
  getElementCounts,
};
