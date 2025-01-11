const http = require('http');
const fs = require('fs');
const path = require('path');

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
    const htmlFile = fs.readFileSync(path.join(__dirname, "views/error.html"), "utf-8");
    const resBody = htmlFile
        .replace(/#{message}/g, error.message);

    res.setHeader('Content-Type', 'text/html');
    res.statusCode = error.statusCode || 400;
    res.write(resBody);
    return res.end();
  }

  let reqBody = '';
  
  req.on('data', (data) => {
    reqBody += data;
  });

  req.on('end', () => {
    if (reqBody && req.headers['content-type'] === "application/x-www-form-urlencoded") {
      req.body = reqBody
        .split("&")
        .map((keyValuePair) => keyValuePair.split("="))
        .map(([key, value]) => [key, value.replace(/\+/g, " ")])
        .map(([key, value]) => [key, decodeURIComponent(value)])
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
    } else {
      req.body = {};
    }

    if (req.method === "GET" && req.url === "/artists") {
      const htmlFile = fs.readFileSync(path.join(__dirname, "views/artists.html"), "utf-8");
      const resBody = htmlFile
          .replace(
            /#{artists}/g,
            Object.values(artists).map(artist => `
              <li><a href="/artists/${artist.artistId}">${artist.name}</a></li>
            `).join('</n>')
          );

      res.setHeader('Content-Type', 'text/html');
      res.write(resBody);
      return res.end();
    }

    if (req.method === "GET" && req.url === "/artists/new") {
      const htmlFile = fs.readFileSync(path.join(__dirname, "views/new-artist.html"), "utf-8");
      const resBody = htmlFile;

      res.setHeader('Content-Type', 'text/html');
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

      return redirectTo(`/artists/${artist.artistId}`);
    }

    if (req.method === "GET" && req.url.startsWith("/artists")) {
      const urlParts = req.url.split("/");
      const artistId = urlParts[2];
      if (urlParts.length === 3 && artistId) {
        const artist = artists[artistId];

        if (!artist) return renderError(new NotFoundError('Artist not found'));

        const htmlFile = fs.readFileSync(path.join(__dirname, "views/artist-details.html"), "utf-8");
        let reqBody = htmlFile
          .replace(/#{name}/g, artist.name)
          .replace(/#{artistId}/g, artist.artistId)
          .replace(
            /#{paintings}/g,
            Object.values(paintings)
              .filter(painting => painting.artistId == artistId)
              .map(painting => `
                <li><a href="/paintings/${painting.paintingId}">${painting.name}</a></li>
              `).join('\n')
          );

        res.setHeader('Content-Type', 'text/html');
        res.write(reqBody);
        return res.end();
      }
    }

    if (req.method === "GET" && req.url.startsWith("/artists")) {
      const urlParts = req.url.split("/");
      const artistId = urlParts[2];
      if (urlParts.length === 4 && artistId && urlParts[3] === "edit") {
        const artist = artists[artistId];

        if (!artist) return renderError(new NotFoundError('Artist not found'));

        const htmlFile = fs.readFileSync(path.join(__dirname, "views/edit-artist.html"), "utf-8");
        let reqBody = htmlFile
          .replace(/#{name}/g, artist.name)
          .replace(/#{artistId}/g, artist.artistId);

        res.setHeader('Content-Type', 'text/html');
        res.write(reqBody);
        return res.end();
      }
    }

    if (req.method === "POST" && req.url.startsWith("/artists")) {
      const urlParts = req.url.split("/");
      const artistId = urlParts[2];
      if (urlParts.length === 3 && artistId) {
        const artist = artists[artistId];

        if (!artist) return renderError(new NotFoundError('Artist not found'));

        const { name } = req.body;
        if (!name) return renderError(new BodyError());

        artist.name = name;

        return redirectTo(`/artists/${artist.artistId}`);
      }
    }

    if (req.method === "GET" && req.url.startsWith("/years")) {
      const urlParts = req.url.split("/");
      const year = urlParts[2];
      if (urlParts.length === 4 && year && urlParts[3] === "paintings") {
        const htmlFile = fs.readFileSync(path.join(__dirname, "views/paintings.html"), "utf-8");
        let reqBody = htmlFile
          .replace(/#{title}/g, year)
          .replace(
            /#{paintings}/g,
            Object.values(paintings)
              .filter(painting => painting.year == year)
              .map(painting => `
                <li><a href="/paintings/${painting.paintingId}">${painting.name}</a></li>
              `).join('\n')
          );

        res.setHeader('Content-Type', 'text/html');
        res.write(reqBody);
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

        const htmlFile = fs.readFileSync(path.join(__dirname, "views/painting-details.html"), "utf-8");
        let reqBody = htmlFile
          .replace(/#{name}/g, painting.name)
          .replace(/#{year}/g, painting.year)
          .replace(/#{artistId}/g, painting.artistId)
          .replace(/#{artistName}/g, artist.name)
          .replace(/#{paintingId}/g, painting.paintingId);

        res.setHeader('Content-Type', 'text/html');
        res.write(reqBody);
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

        return redirectTo(`/paintings/${painting.paintingId}`);
      }
    }

    if (req.method === "POST" && req.url.startsWith("/paintings")) {
      const urlParts = req.url.split("/");
      const paintingId = urlParts[2];
      if (urlParts.length === 4 && paintingId && urlParts[3] === "delete") {
        const painting = paintings[paintingId];

        if (!painting) return renderError(new NotFoundError('Painting not found'));

        delete paintings[painting.paintingId];

        return redirectTo(`/artists/${painting.artistId}`);
      }
    }

    return renderError(new NotFoundError('Page Not Found'));
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log('Server is listening on port', port));