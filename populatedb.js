#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const Product = require('./models/product');
const Category = require('./models/category');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const products = [];
const categories = [];

function productCreate(name, description, category, price, number_in_stock, image, cb) {
  const productDetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    number_in_stock: number_in_stock,
    image: image,
  };

  const product = new Product(productDetail);

  product.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Product: ' + product);
    products.push(product);
    cb(null, product);
  });
}

function categoryCreate(name, description, cb) {
  const category = new Category({ name: name, description: description });

  category.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function createCategories(cb) {
  async.series(
    [
      function(callback) {
        categoryCreate(
          'CPU',
          'A central processing unit (CPU), also called a central processor, main processor or just processor, is the electronic circuitry that executes instructions comprising a computer program.',
          callback
        );
      },
      function(callback) {
        categoryCreate(
          'GPU',
          'A graphics processing unit (GPU) is a specialized electronic circuit designed to rapidly manipulate and alter memory to accelerate the creation of images in a frame buffer intended for output to a display device.',
          callback
        );
      },
      function(callback) {
        categoryCreate(
          'Computer Case',
          'A computer case, also known as a computer chassis, is the enclosure that contains most of the components of a personal computer (usually excluding the display, keyboard, and mouse).',
          callback
        );
      },
      function(callback) {
        categoryCreate(
          'Motherboard',
          'A motherboard (also called mainboard, main circuit board, or mobo) is the main printed circuit board (PCB) in general-purpose computers and other expandable systems.',
          callback
        );
      },
      function(callback) {
        categoryCreate(
          'RAM',
          'Random-access memory is a form of computer memory that can be read and changed in any order, typically used to store working data and machine code.',
          callback
        );
      },
      function(callback) {
        categoryCreate(
          'SSD',
          'A solid-state drive (SSD) is a solid-state storage device that uses integrated circuit assemblies to store data persistently, typically using flash memory, and functioning as secondary storage in the hierarchy of computer storage.',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createProducts(cb) {
  async.parallel(
    [
      function(callback) {
        productCreate(
          'AMD Ryzen Threadripper 3970X',
          'An astonishing 32 cores and 64 processing threads for serious designers and artists. Incredible 4.5 GHz max boost frequency, with a huge 144MB cache. Unlocked, with new automatic overclocking feature Quad-Channel DDR4 and 88 total PCIe 4. 0 lanes 280W TDP, Cooler not Included. OS Support : Windows 10 - 64-Bit Edition, RHEL x86 64-Bit, Ubuntu x86 64-Bit',
          categories[0],
          3100,
          2,
          'https://m.media-amazon.com/images/I/81D-WvtG6OL._AC_SL1500_.jpg',
          callback
        );
      },
      function(callback) {
        productCreate(
          'Intel Core i9-11900K',
          'The processor features Socket LGA-1200 socket for installation on the PCB. 16 MB of L3 cache rapidly retrieves the most used data available to improve system performance. 14 nm design offers great efficiency for computing, delivers nimble processing with balanced cost, performance, and power. To boost graphics and visual quality, the chipset has a built in Intel UHD Graphics 750 controller. Supports up to 3 monitors.',
          categories[0],
          379,
          5,
          'https://m.media-amazon.com/images/I/41jGx-EgaJL._SL500_.jpg',
          callback
        );
      },
      function(callback) {
        productCreate(
          'NVIDIA GeForce RTX 3090 Founders Edition',
          "The GeForce RTX 3090 is a big ferocious GPU (BFGPU) with TITAN class performance. It's powered by Ampere—NVIDIA's 2nd gen RTX architecture—doubling down on ray tracing and AI performance with enhanced Ray Tracing (RT) Cores, Tensor Cores, and new streaming multiprocessors. Plus, it features a staggering 24 GB of G6X memory, all to deliver the ultimate gaming experience.",
          categories[1],
          2369,
          0,
          'https://m.media-amazon.com/images/I/61wbV8oqAbL._AC_SL1500_.jpg',
          callback
        );
      },
      function(callback) {
        productCreate(
          'Corsair 4000D Tempered Glass Mid-Tower ATX PC Case',
          'The CORSAIR 4000D is a distinctive, yet minimalist, mid-tower ATX case with easy cable management and exceptional cooling. A highly durable solid steel front panel and dedicated ventilation channels combine to offer great looks and airflow, accompanied by two included 120mm AirGuide fans that enhance cooling. CORSAIR RapidRoute design makes it effortless to route major cables through a single channel.',
          categories[2],
          95,
          5,
          'https://m.media-amazon.com/images/I/71rWTjzZWBL._AC_SL1500_.jpg',
          callback
        );
      },
      function(callback) {
        productCreate(
          'NZXT H510i - CA-H510i-BR - Compact ATX Mid-Tower',
          "We've made our iconic H series PC cases even better. Our new lineup still features the elements builders loved in the original H series, including our patented cable management system, removable fan/radiator mounting brackets, and easy-to-use drive trays, alongside new updates like a front-panel USB-C connector supporting high-speed USB 3. 1 Gen 2 devices, A tempered glass side panel that installs with a single thumbscrew, and an upgraded Smart Device V2 on the H510i.Speed: 1200 +/- 200 RPM.",
          categories[2],
          128,
          20,
          'https://m.media-amazon.com/images/I/51zJxn7KMbL._AC_SL1000_.jpg',
          callback
        );
      },
      function(callback) {
        productCreate(
          'MSI MAG B550 TOMAHAWK Gaming Motherboard',
          'Powered by AMD Ryzen AM4 processors, the MSI MAG B550 TOMAHAWK is hardened with performance essential specifications to outlast enemies. Equipped with Extended Heatsink Design, Core boost, M.2 Shield Frozr and 2.5G LAN for sustained performance. A variety of USB connectivity options including the latest USB 3.2 Gen 2x2 Type C standard allow for a range of peripheral and device compatibility.',
          categories[3],
          158,
          7,
          'https://m.media-amazon.com/images/I/910jyKG9QlL._AC_SL1500_.jpg',
          callback
        );
      },
      function(callback) {
        productCreate(
          'ASUS Prime B560M-A LGA 1200 (Intel 11th/10th Gen) micro ATX motherboard',
          'The ASUS Prime B560M-A is expertly engineered to unleash the full potential of 11th Gen Intel Core processors. Boasting a robust power design, comprehensive cooling solutions and intelligent tuning options, The ASUS Prime B560M-A provides daily users and DIY PC builders a range of performance tuning options via included software and hardware.',
          categories[3],
          110,
          34,
          'https://m.media-amazon.com/images/I/81D-WvtG6OL._AC_SL1500_.jpg',
          callback
        );
      },
      function(callback) {
        productCreate(
          'Corsair Vengeance LPX 16GB (2x8GB) DDR4 DRAM 3200MHz C16 Desktop Memory',
          "Vengeance LPX memory is designed for high performance Overclocking. The heat spreader is made of pure aluminum for faster heat dissipation, and the eight layer PCB helps manage heat and provides superior Overclocking headroom. Each IC is individually screened for performance potential. The DDR4 form factor is optimized for the latest Intel 100 series motherboards and offers higher frequencies, greater bandwidth, and lower power consumption than DDR3 modules. Vengeance LPX DDR4 modules are compatibility tested across 100 Series motherboards for reliably fast performance. There's XMP 2.0 support for trouble free automatic Overclocking. And, they're available in multiple colors to match your motherboard, your components, or just your style.",
          categories[4],
          78,
          100,
          'https://m.media-amazon.com/images/I/51XWCgqIUVL._AC_SL1150_.jpg',
          callback
        );
      },
      function(callback) {
        productCreate(
          'Corsair Vengeance RGB PRO 16GB (2x8GB) DDR4 3200MHz C16 LED Desktop Memory',
          "Corsair vengeance RGB PRO series DDR4 memory lights up your PC with mesmerizing dynamic multi zone RGB lighting, while delivering the best in DDR4 performance and stability. Every module boasts ten individually controlled RGB LEDs, while wire free design makes installation simple. Take control with CORSAIR iCUE software and completely customize every module's lighting to match your system, or easily synchronize lighting across all your CORSAIR products with Light LINK. A custom designed PCB provides the highest signal quality for the best level of performance and stability on the latest AMD and Intel DDR4 motherboards, while specially screened ICs unlock superior Overclocking. Heat Spreader Anodized Aluminum. SPD Speed - 2133MHz.",
          categories[4],
          83,
          45,
          'https://m.media-amazon.com/images/I/71Kkm5nIRKL._AC_SL1500_.jpg',
          callback
        );
      },
      function(callback) {
        productCreate(
          'Samsung 870 EVO SATA III SSD 1TB 2.5” Internal Solid State Hard Drive',
          "The all-star of SSDs, the latest Samsung 870 EVO 1TB 2.5-Inch SATA III Internal Solid State Hard Drive has indisputable performance, reliability and compatibility, built upon Samsung's pioneering technology. The perfect choice for IT professionals, creators and everyday users alike, the 870 EVO memory drive meets the demands of every task, from everyday computing to 8K video processing.",
          categories[5],
          129,
          24,
          'https://m.media-amazon.com/images/I/911ujeCkGfL._AC_SL1500_.jpg',
          callback
        );
      },
      function(callback) {
        productCreate(
          'SanDisk SSD PLUS 1TB Internal SSD',
          'SanDisk, a pioneer in solid state storage technologies and the brand pros trust, delivers improved speed and performance with the SanDisk SSD Plus. With sequential read speeds of up to 535MB/s [480GB, 960GB and 1TB]; 530MB/s [120GB & 240GB], this solid state drive performs faster than a typical hard disk drive (1).',
          categories[5],
          80,
          55,
          'https://m.media-amazon.com/images/I/71J4Q8zM72L._AC_SL1500_.jpg',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createProducts],
  // Optional callback
  function(err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('BOOKInstances: ' + bookinstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
