const http = require('http');

class BodyError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BodyError);
    }

    this.message = this.message || "Something is wrong with the body";
    this.statusCode = 400;
    this.name = 'BodyError';
  }
}

class NotFoundError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }

    this.message = this.message || "Not Found";
    this.statusCode = 404;
    this.name = 'NotFoundError';
  }
}

const paintings = {
  1: {
    paintingId: 1,
    name: "Mona Lisa",
    year: 1503,
    artistId: 1
  },
  2: {
    paintingId: 2,
    name: "The Last Supper",
    year: 1498,
    artistId: 1
  },
  3: {
    paintingId: 3,
    name: "The Potato Eaters",
    year: 1885,
    artistId: 2
  },
  4: {
    paintingId: 4,
    name: "Sunflowers",
    year: 1889,
    artistId: 2
  },
  5: {
    paintingId: 5,
    name: "The Starry Night",
    year: 1889,
    artistId: 2
  }
};

const artists = {
  1: {
    artistId: 1,
    name: "Leonardo da Vinci"
  },
  2: {
    artistId: 2,
    name: "Vincent van Gogh"
  }
};

let nextArtistId = 3;
let nextPaintingId = 5;

function getNewArtistId() {
  const newArtistId = nextArtistId;
  nextArtistId++;
  return newArtistId;
}

function getNewPaintingId() {
  const newPaintingId = nextPaintingId;
  nextPaintingId++;
  return newPaintingId;
}

const server = http.createServer((req, res) => {
  function redirectTo(urlPath) {
    res.statusCode = 302;
    res.setHeader('Location', urlPath);
    return res.end();
  }

  function renderError(error) {
    const resBody = JSON.stringify({ message: error.message });
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = error.statusCode || 400;
    res.write(resBody);
    return res.end();
  }

  let reqBody = '';
  
  req.on('data', (data) => {
    reqBody += data;
  });

  req.on('end', () => {
    if (reqBody && req.headers['content-type'] === "application/json") {
      req.body = JSON.parse(reqBody);
    } else {
      req.body = {};
    }

    if (req.method === "GET" && req.url === "/artists") {
      const resBody = JSON.stringify(Object.values(artists));
      res.setHeader('Content-Type', 'application/json');
      res.write(resBody);
      return res.end();
    }

    if (req.method === "POST" && req.url === "/artists") {
      const { name } = req.body;
      if (!name) return renderError(new BodyError());

      const artist = {
        name,
        artistId: getNewArtistId()
      };
      artists[artist.artistId] = artist;

      const resBody = JSON.stringify(artist);
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 201;
      res.write(resBody);
      return res.end();
    }

    if (req.method === "GET" && req.url.startsWith("/artists")) {
      const urlParts = req.url.split("/");
      const artistId = urlParts[2];
      if (urlParts.length === 3 && artistId) {
        const artist = artists[artistId];

        if (!artist) return renderError(new NotFoundError('Artist not found'));

        const artistPaintings = Object.values(paintings).filter(painting => painting.artistId == artistId);

        const resBody = JSON.stringify({
          ...artist,
          paintings: artistPaintings
        });
        res.setHeader('Content-Type', 'application/json');
        res.write(resBody);
        return res.end();
      }
    }

    if ((req.method === "PUT" || req.method === "PATCH") && req.url.startsWith("/artists")) {
      const urlParts = req.url.split("/");
      const artistId = urlParts[2];
      if (urlParts.length === 3 && artistId) {
        const artist = artists[artistId];

        if (!artist) return renderError(new NotFoundError('Artist not found'));

        const { name } = req.body;
        if (!name) return renderError(new BodyError());

        artist.name = name;

        const resBody = JSON.stringify(artist);
        res.setHeader('Content-Type', 'application/json');
        res.write(resBody);
        return res.end();
      }
    }

    if (req.method === "GET" && req.url.startsWith("/artists")) {
      const urlParts = req.url.split("/");
      const artistId = urlParts[2];
      if (urlParts.length === 4 && artistId && urlParts[3] === "paintings") {
        const artist = artists[artistId];

        if (!artist) return renderError(new NotFoundError('Artist not found'));

        const artistPaintings = Object.values(paintings).filter(painting => {
          return painting.artistId == artistId
        });

        const resBody = JSON.stringify(artistPaintings);
        res.setHeader('Content-Type', 'application/json');
        res.write(resBody);
        return res.end();
      }
    }

    if (req.method === "GET" && req.url.startsWith("/years")) {
      const urlParts = req.url.split("/");
      const year = urlParts[2];
      if (urlParts.length === 4 && year && urlParts[3] === "paintings") {
        const yearPaintings = Object.values(paintings).filter(painting => {
          return painting.year == year
        });

        const resBody = JSON.stringify(yearPaintings);
        res.setHeader('Content-Type', 'application/json');
        res.write(resBody);
        return res.end();
      }
    }

    if (req.method === "GET" && req.url.startsWith("/paintings")) {
      const urlParts = req.url.split("/");
      const paintingId = urlParts[2];
      if (urlParts.length === 3 && paintingId) {
        const painting = paintings[paintingId];

        if (!painting) return renderError(new NotFoundError('Painting not found'));

        const artist = Object.values(artists).find(artist => artist.artistId == painting.artistId);

        const resBody = JSON.stringify({
          ...painting,
          artist
        });

        res.setHeader('Content-Type', 'application/json');
        res.write(resBody);
        return res.end();
      }
    }

    if (req.method === "POST" && req.url.startsWith("/artists")) {
      const urlParts = req.url.split("/");
      const artistId = urlParts[2];
      if (urlParts.length === 4 && artistId && urlParts[3] === "paintings") {
        const artist = artists[artistId];

        if (!artist) return renderError(new NotFoundError('Artist not found'));

        const { name, year } = req.body;
        if (!name || !year) return renderError(new BodyError());

        const painting = {
          name,
          year,
          paintingId: getNewPaintingId(),
          artistId: Number(artistId)
        }
        paintings[painting.paintingId] = painting;

        const resBody = JSON.stringify(painting);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201;
        res.write(resBody);
        return res.end();
      }
    }

    if (req.method === "DELETE" && req.url.startsWith("/paintings")) {
      const urlParts = req.url.split("/");
      const paintingId = urlParts[2];
      if (urlParts.length === 3 && paintingId) {
        const painting = paintings[paintingId];

        if (!painting) return renderError(new NotFoundError('Painting not found'));

        delete paintings[painting.paintingId];

        const resBody = JSON.stringify({ message: "Successfully deleted" });
        res.setHeader('Content-Type', 'application/json');
        res.write(resBody);
        return res.end();
      }
    }

    return renderError(new NotFoundError('API Endpoint Not Found'));
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log('Server is listening on port', port));