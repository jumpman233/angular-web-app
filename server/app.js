const express = require('express');
const fetch = require('node-fetch');

const key = 'AIzaSyBJ4bQFFJgN0S1DGVpNB5n0dfgW-AFED8w';

const baseUrl = 'http://maps.google.cn';

const app = express();

function getUrl(url, data) {
  url += '?';
  for (let i in data){
    url += i + '=' + encodeURIComponent(data[i]) + '&';
  }
  return url;
}

function getContent(address = '') {
  return fetch(getUrl(`${baseUrl}/maps/api/geocode/json`, {
    address,
    key
  }))
    .then(res => res.json())
}

function getNearBy(location = '', radius = '', type = '', keyword = '') {
  return fetch(getUrl(`${baseUrl}/maps/api/place/nearbysearch/json`, {
    location,
    radius,
    type,
    keyword,
    key
  }))
    .then(res => res.json());
}

function getDetails(place_id = '') {
  return fetch(getUrl(`${baseUrl}/maps/api/place/details/json`, {
    place_id,
    key
  }))
    .then(res => res.json());
}

app.get()

app.get('/address/:address', async function (req, res) {
  res.send(await getContent(req.params.address || ''));
});

app.get('/nearby', async function (req, res) {
  res.send(await getNearBy(req.query.location, req.query.radius, req.query.type, req.query.keyword));
});

const server = app.listen(5200, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
