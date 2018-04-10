const express = require('express');
const fetch = require('node-fetch');
const yelp = require('yelp-fusion');
const path = require('path');

const yelp_apiKey = 'yNtcqX6AbLkSjoNl5586HPsQIKagr_AEx6ocP9jaTO_D20vDJxIBrJ9pxsvcqLMYSibyENFQE0b-ejt2TFz6qXCEZg3884JC8IL9hWm3nrYxPHeZ1mH7yQEotFjKWnYx';

const client = yelp.client(yelp_apiKey);

const getBestMatch = ({ name, city, state, country, address1, address2, address3 })=>{
  return client.businessMatch('best', {
    name, city, state, country, address1, address2, address3
  }).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    return firstResult.id;
  }).catch(e => {
    console.log(e);
  });
};

const getReviewsById = (id) => {
  return client.reviews(id).then(response => {
    return response.jsonBody.reviews;
  }).catch(e => {
    console.log(e);
  });
};

const getReviewsByBestMatch = ({ name, city, state, country, address1, address2, address3 }) => {
  return getBestMatch({ name, city, state, country, address1, address2, address3 })
    .then(id => getReviewsById(id))
};

getReviewsByBestMatch({
  name: "The Little Snail Restaurant",
  city: "Sydney",
  state: "NSW",
  country: "AU",
  address1: '3/50 Murray St',
  address2: 'Pyrmont NSW 2009',
  address3: 'Australia'
}).then((data) => {
    // console.log(JSON.stringify(data));
  });

const key = 'AIzaSyBJ4bQFFJgN0S1DGVpNB5n0dfgW-AFED8w';

// const baseUrl = 'https://maps.googleapis.com';
const baseUrl = 'https://maps.google.cn';

const app = express();

function getUrl(url, data) {
  url += '?';
  for (let i in data){
    url += `${i}=${data[i]}&`;
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

function getNearBy(lat = '', lng = '' , radius = '', type = '', keyword = '') {
  let url = getUrl(`${baseUrl}/maps/api/place/nearbysearch/json`, {
    location: `${lat},${lng}`,
    radius,
    type,
    keyword,
    key
  });
  console.log(url);
  return fetch(url)
    .then(res => res.json())
    .catch(e=>{
      // console.log(e)
    });
}

function getNearByToken(pagetoken) {
  let url = getUrl(`${baseUrl}/maps/api/place/nearbysearch/json`, {
    pagetoken,
    key
  });
  console.log(url);

  return fetch(url)
    .then(res => res.json())
}

app.use(express.static(path.join(__dirname, './static')))

app.get('/address/:address', async function (req, res) {
  console.log(req.params.address)
  res.send(await getContent(req.params.address || ''));
});

app.get('/nearby', async function (req, res) {
  // res.send(await getNearBy(
  //   req.query.lat,
  //   req.query.lng,
  //   req.query.radius * 1000,
  //   req.query.type,
  //   req.query.keyword
  // ));
  getNearBy(
    req.query.lat,
    req.query.lng,
    req.query.radius * 1000,
    req.query.type,
    req.query.keyword
  );
  res.send({
    "html_attributions" : [],
    "next_page_token" : "CqQCHQEAAH3C48TIKmcC6DSdVH0hqaDMPbAvYDi5_JBD0o6Lt-3d6lyvCyAIhrc4UsQ83u7WEtPdOz4RMW8CVzul29CyBtnZZJgo4gRtmWVQj-nTEpZK4YTvMvhd4aAnMFndLYNg1B6auzQweayuDptpK35MO85NjuQ0z3je9A-G1L8hzpGAEVK1g8ibUOGUKMQ9T8H0_WcWkUZE0wgQ4oTRXvtNKM04-ALZSoIoZPS6IJtzS49Fmerxlt_xfsFmk3RoYj7UE_s3u4n4HL7pbOXqUaS0SDdzFAuNI87EgES1Y9moFFNxtMIh-a_4WnM1efAnnZwQwY2Kw4RPDbDqSoJ121llF9JwrMKpdys8Qips7kFcg2YEixoLQO6rSwITFIPImaLTDhIQyGn93sGy5m9YFnAkOb5pQxoUHbbEwX7wTSxjN5BWPu-gMWbRcn0",
    "results" : [
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0522342,
            "lng" : -118.2436849
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.3373061,
              "lng" : -118.1552891
            },
            "southwest" : {
              "lat" : 33.7036519,
              "lng" : -118.6681759
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
        "id" : "7f7b7d8118ae8db8ed3f541159ac928c484d12ad",
        "name" : "Los Angeles",
        "photos" : [
          {
            "height" : 2268,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/118274931403702525504/photos\"\u003eIntercambio Catracho\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAGo7DdVKBQJqBZc-GEx3Y5XGVKC5gT1mCahMxKCyQ4MBqZf84yYl6AAQRGD0RNugp_sG0v9bmJcGFo3cjW3SJyPe_VmU_pua671EUyP70WT0VC-AT5NuMyReWJIsrqtMzEhANB0txoAnihfkfh6Q4QaexGhTJTTCU-Lw37crEUfXFbid1lnurXw",
            "width" : 4032
          }
        ],
        "place_id" : "ChIJE9on3F3HwoAR9AhGJW_fL-I",
        "reference" : "CmRbAAAAb94rsPafwiDGmAR1mfsk17unIdnSweE6rbHNQmc4bccwBHZku2a1R1LyMgsukdxxXJKnHsvF9WZ3BRcYAwiDb04wY9yCoj9TO7UT8ClVMpmEIdn9sKQcPen0f6d2nFbnEhBEIwZ7Pi8gYh7xUuSYGze6GhTG-SyUKH1qJasc_nTA09eo56RUrQ",
        "scope" : "GOOGLE",
        "types" : [ "locality", "political" ],
        "vicinity" : "Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.05352670000001,
            "lng" : -118.2429316
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.05513463029151,
              "lng" : -118.2418364697085
            },
            "southwest" : {
              "lat" : 34.05243666970851,
              "lng" : -118.2445344302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/civic_building-71.png",
        "id" : "7f75c7158a6b7ceac9a8e54d1a28bacf6575a080",
        "name" : "Los Angeles City Hall",
        "photos" : [
          {
            "height" : 4000,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/107993465247707575743/photos\"\u003epetr bousek\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAZNHnEd5PiztMDeA906h7QWEu3PLIAxqqbCMWPQELCOKw5YPmjeRGsi1fgSIquXkpZHjikgj9TU80XL4NpXU4h3aCPOPWh2mXMRHEYrlKpehFBdQdcRY8VU0SIjaGn7g4EhCeK4HNZNj5Dty0nWiTFrg4GhTAczS_DwiHLNa_h22OOPPkBP5kMw",
            "width" : 6016
          }
        ],
        "place_id" : "ChIJ8U1fOU_GwoAR2t6y9AjKEKI",
        "reference" : "CmRbAAAAp4kaSPTIq09Agm1EYr65MnY3ydJ4WEoh15yht3lrkowVc1MCrFJDFR8LnG6HNE5swxSOz3tOFWOHJYZGRkfkyqnTU-nwa-IL9lrqCG21TO-BVYUpdqWiBLsoeC0ZFpg6EhCRNPaO4XhAINeteKwpMSS_GhSjOMcK4pOCLGXKmbd6jKl497AM5Q",
        "scope" : "GOOGLE",
        "types" : [
          "city_hall",
          "premise",
          "local_government_office",
          "point_of_interest",
          "establishment"
        ],
        "vicinity" : "Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.066712,
            "lng" : -118.236335
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0679858302915,
              "lng" : -118.2348255197085
            },
            "southwest" : {
              "lat" : 34.0652878697085,
              "lng" : -118.2375234802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "58721f91d742d0035aba4207de15a1c67087696d",
        "name" : "The Royal Pagoda Motel",
        "photos" : [
          {
            "height" : 1836,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/102550566882372813398/photos\"\u003epeter ståhle\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAt50h_W95LYghVou4Dhv3GYkwhIW9RUpf0qeg8OddO-Ll4z68tOgyKQ1-VtfdLupOomW8N9zBkrptj7vyU-uqS_3kYcNvTdTX_Cj1qHeOpv-QUXpmMB9TWGtmBAFKo97-EhDGBx7QduhrayZeQ98FYvJkGhTx4uavgk8s02yKkB7mtSOXjsT1nA",
            "width" : 3264
          }
        ],
        "place_id" : "ChIJZ_AkO1nGwoARNy378Aycqnw",
        "rating" : 3.8,
        "reference" : "CmRRAAAAEacuwOLQehv6SK0bdKOqAGaWDXvCJd-AVYAXylfd1Gg1pLYCX1UDWXwo6xnYSaw7-6uQevnK4niPvxnShbM0acn1XA6dFxBsjbyRf4DGAXceFYYr0ky-QqffNhUBq_JaEhBVvzM-zqQ2_TzgkJyOCoTYGhQRbOLGR4kZ4uS5Nzmokj-ubDYKkw",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "995 North Broadway, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0588338,
            "lng" : -118.2376156
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0601250302915,
              "lng" : -118.2365360697085
            },
            "southwest" : {
              "lat" : 34.05742706970851,
              "lng" : -118.2392340302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "641731f7fe4d39901159452ed057b0d6e5e4a867",
        "name" : "Metro Plaza Hotel",
        "photos" : [
          {
            "height" : 2988,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/113029289688843594139/photos\"\u003eTony Chang\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAA3RgrB6APsoocRuMj9PnM4n0yR3HI-B_yp6buCrAj__5URWXjrS3HndbLd7bhkBnMz4m1SqT4ZJc2uE2tV2FNSLGY7mDljVCaFRh3PGLW_fGOBc2oU7F8e1iI1qfxKk7JEhBAAaTYifvF5_xrdwBjri4rGhTe4puQG1ZfSwWENjYC77njT-RRBg",
            "width" : 5312
          }
        ],
        "place_id" : "ChIJ2YN22kTGwoARshYCMmIIuQM",
        "rating" : 3.6,
        "reference" : "CmRRAAAAf1zrNlRegLLep1WA7R78ziNL6zjwPtCDb6GqKBDNc3ddznVWU_bMY5PCba1OArsghsCtAp52HL0FExMQy6K6dfebtFLBLN8nJj_TlDHUtdvuVvvTz1l8EfBQiHzpmKbcEhA8-C3OyxwyjI_nD2jhT2RlGhTUUeOBIgWgcY-R-ipFMa9-Um48DA",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "711 North Main Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.063266,
            "lng" : -118.238944
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0646405302915,
              "lng" : -118.2377659697085
            },
            "southwest" : {
              "lat" : 34.0619425697085,
              "lng" : -118.2404639302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "21641302d12987258eda8eea2e0e259c15ea6ec9",
        "name" : "Best Western Plus Dragon Gate Inn",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 2880,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/114030298726656656012/photos\"\u003eBest Western Plus Dragon Gate Inn\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAE9nazkaeGnvUtO5fxawhTViTvrPkXlxnttuuww7Hf8GShns76LdXaI8WV-FXKqlhlG4uYiwoCwxGRtHtKbXj72_cqkiGMw-FuVTnEnTbcDGo0XBv_ApTJyV1iRUJd1qCEhD2DgGLgC9R8Stcdfcueo6dGhSvPH9_Yt0R-S15FBB24HV1Ku2xvg",
            "width" : 3840
          }
        ],
        "place_id" : "ChIJHa52O1rGwoARer87_e2fc1M",
        "rating" : 4,
        "reference" : "CmRRAAAAFSo212jMXnr5OEO0qPqZyp_eepm-EnF-_t9gzoqADwfoxNPCDgvsDR_Q-rNwNN5x1-t21rtrk987rDGT0H4hNvSSrqvS7pBxA95FNg2uenzjiiiOa8maHBnxAyZDkSVIEhDAp2xq0sMTdJTi_k4RvRq-GhTB_dn-G2THfbpvQWynulYKErD-1w",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "818 North Hill Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0496734,
            "lng" : -118.2402369
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0510887302915,
              "lng" : -118.2388049197085
            },
            "southwest" : {
              "lat" : 34.0483907697085,
              "lng" : -118.2415028802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "92ffe126a752d35a00f82e155d8b8edf9769a6ab",
        "name" : "Miyako Hotel Los Angeles",
        "photos" : [
          {
            "height" : 795,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/109326564615104453372/photos\"\u003eMas Hiraoka\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAML3xpvv6cj0UGbBIE1AQxashA7KURLw1HHmWNdRmpi6DbsSAdjYkDoT3da6d0-g-7PCzLZoi6MurgPREezt80vpxWI5WkhL0ODz8jJLb0sFKPtuJ7HrSYMpe555Pd6xkEhAzHmaZZSKBGM1VZbQXO0H5GhSz5xt1yok8JiK_4hTkxcoDphHpeg",
            "width" : 1200
          }
        ],
        "place_id" : "ChIJN4KVwkfGwoARd235b3GLiYo",
        "rating" : 4.2,
        "reference" : "CmRSAAAATn3xh8CumlI-jnrM7A7QXDe1ClJsjLNGgaNxOzGtMGR5m8pRphzsXI-W8Sw2Rt-bnuwZ_DQ-XqwX4TVCOtDPoYBZ3eOE76SJI71iCr1GS5A2OZk8ZE_oove7AY22-nz_EhAdLN5iDwYuVAOXcS0humboGhTMDB0I0etIzhijuXxCiEVDUE5Wng",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "328 East 1st Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0527171,
            "lng" : -118.2477057
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0541645302915,
              "lng" : -118.2464872197085
            },
            "southwest" : {
              "lat" : 34.0514665697085,
              "lng" : -118.2491851802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "a17b93ea9f4305523e93c90998efd9bf6e93d0c8",
        "name" : "Kawada Hotel",
        "photos" : [
          {
            "height" : 429,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/117471541271420826855/photos\"\u003eKawada Hotel\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAik7f6wrYB2L9IPlU5_sE-tCnBtt5bwq-hVgz6EL49N5lRGZpgTx7y-PzmxzKY8VVyIXBWNbP_rOInrMFV0xSDSaFic-g-VqCjMiwzH7SWSXTdqFTyK9Cat_VZoiQPiTiEhDHT0-22uBZMxag2banjUnRGhQO-z29rI3mMYlKA0rxe33c1mRV8w",
            "width" : 431
          }
        ],
        "place_id" : "ChIJk4UcFkzGwoARXX6vn9WOP1Q",
        "rating" : 3.4,
        "reference" : "CmRRAAAA1S9tvdHOykhAAhUYgAQTRQYrIj6gMIkFhigAswoMemNo705lO3VRRnKEzk5nVyl8Lsit1OhlgPoMYFDG1nFcPzXOYuMeFkVuP9o12CrZX_vd5gXnUaQhO17HTPfaNRjLEhACChP9DwIHIIVEh0Pzs48sGhQN7-G7BCIrJgs9DShZ3-Lq4zmc_A",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "200 South Hill Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.072702,
            "lng" : -118.250863
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0740092302915,
              "lng" : -118.2496230697085
            },
            "southwest" : {
              "lat" : 34.0713112697085,
              "lng" : -118.2523210302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "ce3217080ae177836a75d3a716d114ab178781d1",
        "name" : "Super 8 Los Angeles Downtown",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 1000,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/115167342853890313601/photos\"\u003eSuper 8 Los Angeles Downtown\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAk7eKFhjvMt8pgRayKwryKt2qddvNFedpkKOsKX8a-tvlpIBWOFj6lhKw1Umh9NYFLARjzbbM0nBYSzGdVc4uEMDjOGsEq1C8zWkjAPZ0F1n-14bjs8pprg2XkYyfBaUdEhAC9DzpLS-wfb1H-GL4CAVGGhQ90a_tiYVoR3WqOJrdcPEBo2RQLw",
            "width" : 1499
          }
        ],
        "place_id" : "ChIJ1-AcLWG6woARgyVeosF45s8",
        "rating" : 3.7,
        "reference" : "CmRSAAAADOQRte2iu4-YkXzKmBiaMilZZAHLZamZCBfMFOKfupl6xyD_d4ubn78JmKTZEEgIJNFU5cvr9uMfbPFa7ZNYVUt6k-LhpN0Jz0bNfOyNzdr9sXI9UBaE7GCsCzbZxNZwEhAmcAX3cotdT51ZR4V8IyFNGhS6DfiPhOkhoKkGG-4yWDEee7VO1w",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "1341 Sunset Boulevard, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0661834,
            "lng" : -118.253828
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0674724802915,
              "lng" : -118.2525675197085
            },
            "southwest" : {
              "lat" : 34.0647745197085,
              "lng" : -118.2552654802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "b562d69a1a24a38169c7f725cafba2127263d5a6",
        "name" : "Knights Inn Los Angeles Central/Convention Center Area",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 1836,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/117402511566580701893/photos\"\u003eUrsula Seemüller\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAvnhL-Bap4LXoIkkB5FaiTiikUsEImWXn61Jf2R6BWIX2sCwv_1xuVGH0PF_rkpFSfQ18jrATWcxFl-nksoPQiz55R3DVaxMSMc2VjmLnCjX73DgFqFo3CMW9HwmGhskxEhDS7dJE3FMnuBEtYbIIwiSOGhQqIOViKv3_Ch-Do-hcKHB41zprcQ",
            "width" : 3264
          }
        ],
        "place_id" : "ChIJy0JcEwDHwoARFYis_tnpviw",
        "rating" : 3.7,
        "reference" : "CmRRAAAAF676LAa6xSS8StAlIpe0jLTVdYDN9y_umg7ap_R7WTwfMpbDffRi8KWwaZQgPOBc5yayTprukRcXpwkBFB8fF6GEtzDs2uEb8pmWvc7xxBGee0RzIMdMFhKxXMyizEbeEhDngoItaPwn18kmqQQVHM9IGhQeCJKGiLOSg7bYylLxwTtcmfCNDw",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "1255 West Temple Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0442774,
            "lng" : -118.2507798
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0456772302915,
              "lng" : -118.2495002197085
            },
            "southwest" : {
              "lat" : 34.0429792697085,
              "lng" : -118.2521981802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "8e7a1b9dc43f5580a89669961defd25d7a67b263",
        "name" : "Stay on Main Hotel",
        "photos" : [
          {
            "height" : 1365,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/104908431756212890221/photos\"\u003eJay E. Jenkins\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAA-9C4p8V5HUdVs1bz3TmWGG82mmYJubI8ykoysMSZsM1j-QnO0hBV_ncPQfUkZ_tmyHr9ao1DdlWV091lce7sbbrLgU4qfyzcYPPkRqwptdInG0Lbycm8-opLZGJqe1PDEhDY-mT0BuNcwaOsELrGhl0TGhR1eHzhjubuUypO4C10On1ndtoHOg",
            "width" : 2048
          }
        ],
        "place_id" : "ChIJQy-6bDXGwoARZln-R4MPoGQ",
        "rating" : 3,
        "reference" : "CmRRAAAAXS84qW1aMNBkQnwKRf5vM1BwuuS8zBCAHNri1BLL8qaaH1iCXtVhQrlNTwv8alvvxlvzl3bKvUGpfiC2G8cZrQ09REhLJ06_2GYpPk_7KQoHbuEykr10Q89R9Q6eyQa0EhCd0jfmbE7N73xlClNZJtEkGhTCOXZUltqjPSnHQ1lrFwgZsxD6MQ",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "640 South Main Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0550246,
            "lng" : -118.2554539
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0562221302915,
              "lng" : -118.2538212697085
            },
            "southwest" : {
              "lat" : 34.0535241697085,
              "lng" : -118.2565192302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "1f2377c0b75bb4122fd8eb31d565b3e891aa724e",
        "name" : "The L.A. Grand Hotel Downtown",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 427,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/102040354102910220836/photos\"\u003eThe L.A. Grand Hotel Downtown\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAA9Fh5Db2j51YUHvyIjqMjOdWIVx1mD0vxY3MEzHWNtf7qkGHfWncXWqswkb9f_bltOwQPbqqVQIUY-InCacx4wq_WHwMWvVpkdqiROqy0XucoGshE0QeX4CBnXA8AFjtrEhDQN9U_9Hvovnsv_hRdyGQ_GhSMzQf2ujanRYYxMDjzJ-n8l4J00w",
            "width" : 1280
          }
        ],
        "place_id" : "ChIJ8wFsf63HwoARuDYVgplSZ9o",
        "price_level" : 3,
        "rating" : 4.2,
        "reference" : "CmRSAAAAYCx3edZK_INvNMfOCnStE_puRlMgSmJNMsyHXzDpO9Ycd7SgFW2rwjQAzUhTgLxqcEzObzl_jXp_SDmmRqwWoyi1LL40DCGq7QSeNbbXXiPRQlIJPECAI3DKeV0PMIo5EhBcBH8Lyu4eV8KH7rCNjbLGGhQS5H7uilslvt7XxP3PmTfKHUuBkg",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "333 South Figueroa Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0527839,
            "lng" : -118.2554921
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0540239802915,
              "lng" : -118.2544647
            },
            "southwest" : {
              "lat" : 34.0513260197085,
              "lng" : -118.2571659
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "6a13d5b0f8e7bf65e2e914291b13824e91c9f902",
        "name" : "The Westin Bonaventure Hotel & Suites, Los Angeles",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 900,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/111482929963370929438/photos\"\u003eThe Westin Bonaventure Hotel &amp; Suites, Los Angeles\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAuUGJKcx2Z4RUNQmvLQ2kygUpq2OmC_zv7Bk4AyLH2_Kv5XxtfdvwZcsQEKWeuS9MRSsGzndWnWv9tjECNPZKurdpb2eR-o5fGdf0mbPmYd1xjlLRy36ODk5VLns1jg11EhCzCZy0Ymt2mfbQ3Cu_x79SGhTChORZqLDGtkvnnoBbuYBc3pS4cA",
            "width" : 1600
          }
        ],
        "place_id" : "ChIJ_X3CRLLHwoARRT04UFlchVE",
        "rating" : 4.3,
        "reference" : "CmRRAAAA8lc6QUW_rQnMg6x1lz-voZZ8nQ_UZ0uXHDabBgtA24RmTVMLNHTTlt-xy3loZb7yag5iQewJo1r96Dh0zZs81v_ilLcDzAC5PjE8MPjiTdBUQwK_XzBrV4CMTMUWTVIwEhCUVFvpmZZhzvRbvrl7z2ZzGhTIZndOoqAHpacvb6aBThlhCWFrPg",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "404 South Figueroa Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.049626,
            "lng" : -118.255
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0508706802915,
              "lng" : -118.2534868197085
            },
            "southwest" : {
              "lat" : 34.0481727197085,
              "lng" : -118.2561847802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "a6002da196e36f74c4b4d3d2e50838973f9a9cfe",
        "name" : "Hilton Checkers Los Angeles",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 1761,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/102147484734583385887/photos\"\u003eHilton Checkers Los Angeles\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAA4Qcj1ZMj8yXsE2GnrYlFL7EUTbTddpayoUj8qf5v1RaI-j8tZurVT2TiJ9NW3loNS_O4k4_i4ra0DTDAs0KyeWVu061htKOoWSZlwDTwaOklPrHm07NOCTyCiNmBnlxLEhBCKX3N8F9eUzjSLRcX1hhkGhRC26K1Ox8zI0k-W3_Pnpd9pPz85w",
            "width" : 2048
          }
        ],
        "place_id" : "ChIJU9oTm7THwoARF9dZF0pdn0U",
        "price_level" : 3,
        "rating" : 4.1,
        "reference" : "CmRRAAAAlvA1XoCXl5YR40zTKxQ_1PAsEiQKkAG0fAMzvCcrA1BagYdlBBzoRpofMxtN4RpVB8F7MPMx8ptU1dMw75rSgdqvFk-SYs1Et8ZAAcMT979s6u3jLQ-w8vvmt8EiiuKiEhBTDvqUAwaLqbdL1oix7n8OGhR8egOkWGV5uHguH4ZB3JQnPLWGgg",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
        "vicinity" : "535 South Grand Avenue, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0465967,
            "lng" : -118.2550311
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.04785993029149,
              "lng" : -118.2537986697085
            },
            "southwest" : {
              "lat" : 34.0451619697085,
              "lng" : -118.2564966302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "31ca02766c4c50704857ec437055af9b02093f06",
        "name" : "The Los Angeles Athletic Club",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 2160,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/100826227071281434832/photos\"\u003e柯銀秋\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAx9lnM6xmkl9TuVPynYUhXxv5r_9GwUtAxIvHLUS8Facmk5I2r_GbzLHKsT12H4Y68FYAgMrRVJwznJ91jlxpmdgKrp5TzXY6hbD719kK3Go201X6bVmWRHojAT3qsp-8EhBOM1Fpi8eUwsdJBn00WKVYGhSGe9Vc7BTC71eSrYhd8k2qlJ7Ruw",
            "width" : 3840
          }
        ],
        "place_id" : "ChIJ-_RdD7XHwoARN0-Zc_fk4ZA",
        "rating" : 4.5,
        "reference" : "CmRSAAAAoz5snVtIxngkgUBQYfpTxJr3TrSHU5tHlusPjWNhRyX9Q4fMD3z3Ys9vpkgcrISiMXXPPJLd2dkeMtrOmfYKjUpAf-nPijQ7OtjEgovqDv_pZ4dO05Rp-L1h2O7Q1l1DEhC_ij1V1R5quKGCXXXPL1IdGhToAt3hMw8_D7pV4YuJAxNBEO4WcA",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "1601, 431 West 7th Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.05020709999999,
            "lng" : -118.2569902
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0516252802915,
              "lng" : -118.2557878697085
            },
            "southwest" : {
              "lat" : 34.0489273197085,
              "lng" : -118.2584858302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "732a4100780e3d0cbc0242119ac7cd4683bd2232",
        "name" : "The Standard, Downtown LA",
        "photos" : [
          {
            "height" : 475,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/100961544996701604946/photos\"\u003eThe Standard, Downtown LA\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAANy9chzhn_VL5gQzd1JA1AO8lJlIHU94uyDoICit5Cb8OWKOyecX2Y9bNP5LIK7UhLAWok2KlQbjvt2OcvpjduWChzdMQxg8W4ICCUx99JprLZd5v0SkTq3NBe4_3TcusEhBneKutWYE82GdqFWOZxGgdGhS50PJ46JvoxJWer22QTDESpUricA",
            "width" : 930
          }
        ],
        "place_id" : "ChIJ71dGk7PHwoARHWr_QGbZIGU",
        "rating" : 4.1,
        "reference" : "CmRRAAAAMydWSTaOy2Oqcl12bn0kr96h52PEawVViX1qVLfEo4Wqdk2QHIRbaMqIql0JCPSEEWsGhGREukmhIM_6ViE3dQ3gtuYgJeGOXUtabrVmVRsyjzxd5sR_G0CLfkGZCKufEhD46LAtjXlP4YmiBo1dYWJSGhShhYsOSQocOj_GJLBlIqmoKF_nQQ",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "550 South Flower Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0478628,
            "lng" : -118.2583756
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0491710302915,
              "lng" : -118.2567943697085
            },
            "southwest" : {
              "lat" : 34.0464730697085,
              "lng" : -118.2594923302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "9315b38925bc468c40f76500b94350528547c544",
        "name" : "Sheraton Grand Los Angeles",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 2596,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/116340037341532193700/photos\"\u003eSheraton Grand Los Angeles\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAWhOzqPdhF4G8aGa--gL10QUOURPq8VK8t6VHpnCiZD77dvVgd682YmLgJFA5eK1JMMYHj392_v2V8BgdnoCEGVhhYjAqqc-MjQohuRi0aTfV0NhNt6wsmFY022st_YfNEhDQeulD-M5qES1HadVZKhuyGhQ9z__Rcln9eoovKXLnKzI-yTR_ng",
            "width" : 3840
          }
        ],
        "place_id" : "ChIJmRr_HrTHwoARjigvltPYgzo",
        "rating" : 4.4,
        "reference" : "CmRRAAAAPNEXDFylrWQ5w1Rj8gzRIJOX9Qfaz45-nub37EjpVVXYHx6BOABose2ESEmKHHvnzADN8HFfMQlMEjsLVWoTnqM4Kw40pxNfZqPnDtkUhg9efTPLu7vWx1dIiAbGuvPCEhCDvTirP_EOC71roaBK-IxkGhT69EOrLx2NkZwfSXqzlTtIp3IXXQ",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "711 South Hope Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.047144,
            "lng" : -118.260768
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0483849802915,
              "lng" : -118.2592493697085
            },
            "southwest" : {
              "lat" : 34.0456870197085,
              "lng" : -118.2619473302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "982c028abac06d376497f4d905a2cf86aa77f265",
        "name" : "The Milner Hotel Downtown Los Angeles",
        "photos" : [
          {
            "height" : 1416,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/117473141251896508626/photos\"\u003eThe Milner Hotel Downtown Los Angeles\u003c/a\u003e"
            ],
            "photo_reference" : "CmRZAAAAjU48ZVH6DsaEifRH9jVfYVu4cDlD9UgLh8O965V3Ew0v6wB3jA2-GawowRCe8Lpr8nMt1Shhg54LnkSHY-RfHxbBfAorD07RUz66w_6uaEKG03gs4167A0w6eSSk50IcEhD6-dHYHG6wnW_Aj8703KgZGhTRguJBOTjAmktsWz14Wivfy2IWxQ",
            "width" : 1410
          }
        ],
        "place_id" : "ChIJ55_V6bbHwoARijuc6LIE0X8",
        "rating" : 3.1,
        "reference" : "CmRRAAAAVHUFuBb1fUht5nZCSec7IeVWBYrY2dTUFB1leUSvXDXZAWtFntY3vSoWtFlJp3b1-qH1qpBoOkaBBkJUgQibTnHDG6RaR0Rq38xfBQDlULsXB4m7gtFPRZMJVytSdDkIEhCS2SoCY4FmdRxDyRQ4CipJGhTxZj4JPF4A2ya3XF4AXcFVPM2BTA",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "813 South Flower Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.051384,
            "lng" : -118.2647042
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0527291302915,
              "lng" : -118.2634130697085
            },
            "southwest" : {
              "lat" : 34.0500311697085,
              "lng" : -118.2661110302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "b73c1d94b4e126a8838839de7aeae607a861ad6f",
        "name" : "Americas Best Value Inn - Los Angeles W 7th Street",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 604,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/116867228493516132631/photos\"\u003eAmericas Best Value Inn - Los Angeles W 7th Street\u003c/a\u003e"
            ],
            "photo_reference" : "CmRZAAAAHiZGjd72xemohPQoWxMq7_EbReBAqoRS0VOD_iVQNBOA2QxeeVjNNV91aIDDmvKRYV3GoKyIzc447v8uQcexD0cZH783HUJsYQoTYB0GWKkZWS6WF1u2VzYzeUJxx6XrEhD5rw6_fXXoatIInzb3TXUTGhSLdot_RJAz3dv2fY0uOcvXgqFUvA",
            "width" : 533
          }
        ],
        "place_id" : "ChIJkzUHorrHwoAR0k1roUPEjvM",
        "rating" : 3.2,
        "reference" : "CmRSAAAALBOjrsRDrG7fOEWReUvpH_MoaGwQODuaHd8PM3nnRZjYo7ZNbXvdJCav7C7eCTVIJb7bLhTNDy0yLUAi3Tml3NonLuJsCN0qhJDl7znhRfxtTSUVVncQyZ9LcHyjg0OIEhAkjN5bJK6cZj-15epb7WKsGhSQQcSR0zUHeB0cBdTdTV2h0-1uwA",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "1123 West 7th Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.051523,
            "lng" : -118.2650043
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0527260802915,
              "lng" : -118.2637357197085
            },
            "southwest" : {
              "lat" : 34.0500281197085,
              "lng" : -118.2664336802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "7f6514173826a109a82862519df691909daa91e2",
        "name" : "City Center Hotel",
        "photos" : [
          {
            "height" : 600,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/101178563892763420233/photos\"\u003eCity Center Hotel\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAUGxfn65N0BQdi-dKqzLSW_GxGsRj3QYlHCcm9kSon80Z_R3CI2Ce0e1X6M1tyHDlv_ZF7yGZExRcdeiC78h602DZyYj5O2B6_XmWMuimZramGg0QvDg5xtGk0zZd1E1BEhCVBWqq1FgzBRXmR2cNb0lAGhR4VDIGhFZc1UNGxvXlR-nqj0IuTA",
            "width" : 800
          }
        ],
        "place_id" : "ChIJBRsno7rHwoARfpG-chZoMxM",
        "rating" : 2.5,
        "reference" : "CmRRAAAAQTTqnGqvggvbLsp3mAyfbCigjjGd8tDBnktc8d7jvW85Bmilbdd8ZRUr9wnR2YGTEvBOSFDEI04PNoHht84i7u3zaBfdds1aab-LCE3qGjeMjIKsyt1SpXQIeFOPGeNjEhAb1c6EIHXW_3cGE1CCCeu-GhSr-j457kryzccIGDZr7dHBrLpR0Q",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "1135 West 7th Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.1477849,
            "lng" : -118.1445155
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.251905,
              "lng" : -118.0654789
            },
            "southwest" : {
              "lat" : 34.1170368,
              "lng" : -118.1981391
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
        "id" : "8b4b3c6cbc5db3b204124335deee6ae96ba83765",
        "name" : "Pasadena",
        "photos" : [
          {
            "height" : 1176,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/104442262011493169473/photos\"\u003eK Michals\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAyOlRT3NErXba9ALCctxwFXVcO9N0ugV67NXfKRl-Isp0QsAvsXVAWWN6H0Nhhd35U6pCsUB6BfHTcG-ALo3V8g7u8BeBd9JLVeQxRh4bygvpwdbQ5PXoj0bwXsk8Bjc9EhAOCviOPUkycFZa16LmxWPTGhRF6EfY7OmR1KEad7EDqe__XaMHyQ",
            "width" : 2048
          }
        ],
        "place_id" : "ChIJUQszONzCwoARSo_RGhZBKwU",
        "reference" : "CmRbAAAAfUt9OXKJFuNCP6YGgxcKK8qpTqo6bOz-mK0f0Z6Lnpr5BCHklff0sADDVLVtU1voBiomY43_Xpskq0qrR_fH0PyIKUEl06fYplLaSqxF4FdFFjeUM8O-V8ARhfAqo01REhA8xVvISXtrOdln3C4zF-OHGhSK7d76QT2QhLjEbpyoHY0XrHewJQ",
        "scope" : "GOOGLE",
        "types" : [ "locality", "political" ],
        "vicinity" : "Pasadena"
      }
    ],
    "status" : "OK"
  })
});

app.get('/nearby_token/:token', async function (req, res) {
  // res.send(getNearByToken(req.params.token));
  getNearByToken(req.params.token)
  res.send({
    "html_attributions" : [],
    "next_page_token" : "CsQDvQEAAPDVpEOUPbQcWqSgyvTo1w31Yc9zG5dy3QSIV7j25-VHk7TrFW_L6YhIsWcy8lYnZaTHbpUxaIPrnee3QqWBT6d92IfU9Fwo_MwXEy8uwJNfrTAP4QDoMMlPZCB-EmBSF97qHLO1eBnG55xOjlmlolDtXFPstIk5isTo3aNrN-h0JT9Ez9eUwW_7fTcTIuPI3LiTxLbyK3bZhfByRSTLlyup4OPoBQET22nCSpzm2l92yHcL9OvRgrEfMj_NlhakhF0RLTocHwlPOHDdvaOrxNk70RNVjMtKQiUnXVnWHffsn-eoi5N23-tRoDp69csaocVtzwo-QB6elx2iTjfHj81OWulzay2i61tJWQ_GRKZ2fOSCGoSW5GdO47SlrmVxqVjkpzxtB8dFEc-yKSZ2xNtVZ2InS8eyGNGId9lsjPLzFEIZtXHhgrFgYMzVb5mfIqii2-3JuR3-L2KHhzm0xHUEWG8oUMVjoVb66CUGCxEe0vipCSl8M9BEoPxaTt-rppdH9kE707ZY6I4No9qONmKGmv8g1t1CrOg33kXSKTq8oh9SJ0hz-UYajPEvXVogqWn6_jqv3IcfAU86RFamMVYSEBdSMiVupI0m3AmLBgbLNFcaFGhypKOIzHzG1AonKhHdhmSp24f6",
    "results" : [
      {
        "geometry" : {
          "location" : {
            "lat" : 34.045529,
            "lng" : -118.2640141
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.04677038029149,
              "lng" : -118.2624917197085
            },
            "southwest" : {
              "lat" : 34.04407241970849,
              "lng" : -118.2651896802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "0a9302b82c33f27f2448edd68d3a18f90d473e27",
        "name" : "Hotel Figueroa",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 315,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/102386886994688125082/photos\"\u003eHotel Figueroa\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAj-l7r6yeh9m1TB8jxNCsGzQs7D5JQX9Vp_Ru0k84cVGL-w9_nfMpM4zHAng2B5EmNIVgV1AfsOJHPa0EC7v7ol07_qYNiYjapHKg2Y_4moByv-a7BTmcH-SsAxoOC0aUEhDprP1iaVYNqIcLqZvLMK7GGhQIXJwzEZ6BkNQ7c9xWJU3hjNt2QQ",
            "width" : 561
          }
        ],
        "place_id" : "ChIJzcQQfbfHwoAREpay4PPzicU",
        "rating" : 3.9,
        "reference" : "CmRSAAAAHrHt0ugbdfejyZK_t0upqwNsHoNGs2mOgrwhGztf8-ELOyCyhOyBsnZLS_hkQ4n27QNRgWXpZ6EAWj-CLiewoh4igxup1C957xLPbIAvJ6D15alQPQfJuxyFbXv2Ebo2EhCsEiWn8lgHEOt_1GO3iOAVGhQmurfbYNXd6rsuVYcwvGNXS4dk2w",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "939 South Figueroa Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0442194,
            "lng" : -118.2642338
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0456828802915,
              "lng" : -118.2630155197085
            },
            "southwest" : {
              "lat" : 34.0429849197085,
              "lng" : -118.2657134802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "7e3a39879fe363eea716329855ec3452cbf2afb0",
        "name" : "Luxe City Center Hotel",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 2448,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/104373253714864996732/photos\"\u003eOmar chmaissem\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAA86dlx_W53Cyu36cuy3zaQv_Nu8LsBiKABEpwla61Qme-_Us9jCNuJ2_7TbRJuKPrDrOljhAh1XvJpqI3IUysyfzWoXKyoLewfHaelw09FXSEtHcxws9b3OiRjJRt2tczEhD11GZ3jxXSz60FcO9mkcDNGhSIFOlFkqSbimigxP8Ajgj_IQeA2g",
            "width" : 3264
          }
        ],
        "place_id" : "ChIJbTyah7fHwoARGltyvZT7uC4",
        "rating" : 4.1,
        "reference" : "CmRRAAAADvAB7xuKmCH2_-PfoEbqLXFVX5OigmDRuyp7v0b9OnsJCDw9-CEJb5UC-uWoPxzAZ737f0Ds_WQ2ed2gr26LTscpfNWnOEagnTp2SiUk4PwCSJWncAmG1kkBg92BCjCfEhARh-VJzsR84QbJVHQn0QvSGhT5WQAUipHrxf3akGBk4Fqurmcaaw",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "1020 South Figueroa Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0751204,
            "lng" : -118.2654385
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0764262802915,
              "lng" : -118.2639004697085
            },
            "southwest" : {
              "lat" : 34.0737283197085,
              "lng" : -118.2665984302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "0b80d7aec36ba2f9e258cb4c9b79af505db914eb",
        "name" : "Americas Best Value Inn - Los Angeles/Hollywood",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 968,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/112751319668189885943/photos\"\u003eAmericas Best Value Inn - Los Angeles/Hollywood\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAkymiDfAhBzbsSiGtSyi4S-IpuS8tvt6t_F7oNlGhGOoZD-OOU1G8fG93K4YZMsm-uj4LOJufSBUl8TzqUbFxUpoRGriT_K_mtRbT-5hjtsqF1n5OLQCL6RHbGdXHCpCfEhD8v41k-1djM5i2dVHo5hk4GhR2vSpjEzzTDX0sW3PaUlGeqqTxrQ",
            "width" : 1296
          }
        ],
        "place_id" : "ChIJQ4RnYxDHwoARDDp7hdDgRVg",
        "rating" : 3.9,
        "reference" : "CmRRAAAACxCDL21sab1wzSoEynZlKgdHfE3COuxTHuF3nLp3uN8EVJXSK3htaNnFxBx3S8m1SicufBPk_R09FKuUwb6ta02t50zgaQjvbyQoYHrG138qrMCj5Kqy1bxRFfZBLM-XEhBQRJki_m2_7WoXy81lJd-gGhTxCkqrw7Og_v3Gr9SwAh4hSogmfg",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "811 North Alvarado Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0520207,
            "lng" : -118.2678316
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0535034802915,
              "lng" : -118.2663587197085
            },
            "southwest" : {
              "lat" : 34.0508055197085,
              "lng" : -118.2690566802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "e12cc393d212e9f6d1114a5d648ab72828b83594",
        "name" : "The Mayfair Hotel",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 500,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/109466095670365488606/photos\"\u003eThe Mayfair Hotel\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAA2NymelJsrXgIxDPnXyxEKkZ54FFeEPwq_qirbvO-wiVAGwWj1J2YHPCByTFaFkH6hFm40B1kdlatm9rUEsylPUEp43a5SVhCq_n0omnxfGCtGw-UFsoBmsRla3ocSqMEEhCg1Df2mIpXf1XujCbOL8Q-GhQLw8KcTaLrJDrB22heaczgOUFTkQ",
            "width" : 1500
          }
        ],
        "place_id" : "ChIJM3O5X0K7woARvthIoHV0730",
        "rating" : 3.3,
        "reference" : "CmRRAAAALYbNW_zknc2RnQp55YpIw5IdXTMO-oixfRTgrQaI5mF6xYY92OYAk7i46XZbcnVJkW8w8w4JDofwrC7qJSwx639H79DL7CbjVKKFzDPJp7vgH0qCMaLP5k9bl5oJaq6bEhBXTm_VnqRsEaUcnxbJ3zn9GhQZRJciGDsxA6uAmDzkKzfATahc7Q",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "1256 West 7th Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0454424,
            "lng" : -118.2666
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0468205302915,
              "lng" : -118.2653880197085
            },
            "southwest" : {
              "lat" : 34.0441225697085,
              "lng" : -118.2680859802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "a41364b96341c6daf8c747f9d2da0ec9d4c33072",
        "name" : "The Ritz-Carlton, Los Angeles",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 1123,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/113485889837578271479/photos\"\u003eThe Ritz-Carlton, Los Angeles\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAOGP6Sv7-O70snle21XOf8f7ExGfly2fC5yBkTKlTTZZNxj7pIMjD663fBfP5CMrFCVlVnwalRlLdjcMBNStxaxU9XQRiMrUAY-M-AmUAqiUPTr9ks8VZ1FTaTahqka-OEhBDqPj48PjqLbP8OMVrOFeUGhTDLf79Lhd_4g9ktOw0C_shck8a9Q",
            "width" : 2000
          }
        ],
        "place_id" : "ChIJj-D-ernHwoAR_8mMtcIDODE",
        "rating" : 4.6,
        "reference" : "CmRRAAAAgXXcq5sNMbidssYPCOCWpx-vc4AdFn3KHuyUgO2Ogm55Rif-HZlk4oGkki5p-SjbcbhfX56U94-aWAixcSibf7FPGPHMcbU280tyV9gLIs_-RmLA4KvtF62auobb8wY2EhDoVesIwzU4mlUrayzxysMMGhRn9gOLth66HF1cm2LWG33OEwSwDQ",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "900 West Olympic Boulevard, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.068014,
            "lng" : -118.270133
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0692506302915,
              "lng" : -118.2685280197085
            },
            "southwest" : {
              "lat" : 34.0665526697085,
              "lng" : -118.2712259802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "06ec6263a23695913adc45809ba4fc7e06f9995b",
        "name" : "Hollywood Inn Express South",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 390,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/117122958528545086939/photos\"\u003eHollywood Inn Express South\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAcUjG2QcCan0qiRVW3iZz4LoeZCKc8p2u3l4wIxmf72Fscwwec4ukYVB6jYgh7fASeZ6exAhJeQr3N4smq4yZybUVBLJ3zufjh-H9HQtuqeHQNToASwPxtBOKIN2s-yACEhBPk55C1gE2Xq_t3m9fAHvWGhR7UGNkokEq_nvR-bRNwCZUwTyfsw",
            "width" : 710
          }
        ],
        "place_id" : "ChIJFwZ5qA7HwoARCOFn1Sxki0A",
        "rating" : 3,
        "reference" : "CmRRAAAAUvWTAU8a2lyuY5FwGk56r_GP6App2K1GqK5HOVZIESk6ENgqit0xdnNuSO4ZvLONIWVLgrQjk-wvVC_efdvZ6fWqKYqQsZtuhPAaVebutjYhUzqjLwPys04wR-bTJW2lEhAD-fDeIJnL3p7h05sjKtdEGhT-LXMhY0za_C5bFzlbTRYGhxK-rw",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "141 North Alvarado Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.04510619999999,
            "lng" : -118.1615269
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0464531802915,
              "lng" : -118.1603843197085
            },
            "southwest" : {
              "lat" : 34.0437552197085,
              "lng" : -118.1630822802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "7a90bbe4d559f4ac05f12b138f3440922f9db1dc",
        "name" : "Floral Inn",
        "photos" : [
          {
            "height" : 2560,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/105300668815526212876/photos\"\u003eLamont Moore\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAASBaijHXuutvjEW-rPdrDukh-G8Q6n11HIongI_hjG6lHytRk3kUDSMxIn5jMS7w78nTPOGYpYlYGTj58QiuVwZRntT2DWe6JTitIpxMFOkVYkXf7Af_YItzhtCIoSHTzEhBCzbAQd2448mDegv1Js795GhT_jk_X_bsqtvAo6zmprHMFe1d5aw",
            "width" : 1920
          }
        ],
        "place_id" : "ChIJbZ8LrH_PwoAR2zfn8RcP5xw",
        "rating" : 3.9,
        "reference" : "CmRRAAAA5aVCSTNmiIen4yQbFvizYpdZSH-sRE_HmN7-GdSn61UIguqEW7KqfsRdKAa4acigVgcr_d7ly_S_vB2fVn6h6G77RYXGeZ2a1F4IJTgK-PBjeAB7R1Ez_Y28CQk6iyUdEhB2AB1MwAa5mzQ3q3EVaG8YGhS7xl0Fvun4IFZmWmocnNWDs_tKAQ",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "1560 Monterey Pass Road, Monterey Park"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.058683,
            "lng" : -118.27429
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0599585802915,
              "lng" : -118.2727760697085
            },
            "southwest" : {
              "lat" : 34.0572606197085,
              "lng" : -118.2754740302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "bfa9eee8d9b1806774eabdb49942fc21e7a74aec",
        "name" : "Holiday Inn Express & Suites Los Angeles Downtown West",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 1200,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/115165894473372631874/photos\"\u003eHoliday Inn Express &amp; Suites Los Angeles Downtown West\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAOW4KWRpo3Y1EY-cIsQgrsUdJ9i0lBohSDM0SP86XoMzUDKryz-PdOb602HzBOCrgsfEcpJWAXgB_hTb6MFSuMc5HhWeyes6UoIFxlKsnkveXX3USmuAmtaJai9r6UA5QEhAxqWgFhC8jT1ffM05i5gC-GhRlbv4rxplhIMqfe3zEMpUl3mGYvg",
            "width" : 3840
          }
        ],
        "place_id" : "ChIJ8agYT6DHwoARTOc9jiheHMM",
        "rating" : 3.9,
        "reference" : "CmRSAAAAuOUs9cQl2fbahHBW6zhX5dqcgpiXNFYS-z7A614-lpTfn3o8kInCq4l7KoJpB9AlDCnzxho7dycZhMyBxpeNOSCW3gPOy7FVf3IGhuvqsMzIb4hFNjNex6sO5yufU39HEhBYKnOhMTerfDDiOvmjiOpPGhT3o26kowPD8NJeG0zDPEBfDQSrdQ",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "611 South Westlake Avenue, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0510185,
            "lng" : -118.2771083
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.05242708029149,
              "lng" : -118.2758930197085
            },
            "southwest" : {
              "lat" : 34.0497291197085,
              "lng" : -118.2785909802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "b1dc11846f696df42a86d23b16d71f39d670701d",
        "name" : "Staples Center Inn",
        "photos" : [
          {
            "height" : 1536,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/105159047107513854817/photos\"\u003eJames Braid\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAA8lR2La596MvutaP-2TORZ2Cy3mP2FTnkfDWWSc32SURcD2lhNig2Rttv2ymb14qpprrsNYzo1g_CWqhXMGDRQt_Kl54plQ6Gjfo5zc3Ln53No4XSt5Gka1Z0SGS79zTSEhCQAoXygrq93alXrdXo3Ue5GhRAoerriGrx9mMlLWKtTNUnQRV8dQ",
            "width" : 2048
          }
        ],
        "place_id" : "ChIJU-AfaZjHwoARpDc-d_NguUg",
        "rating" : 3.4,
        "reference" : "CmRRAAAA5UXvDZZ8RDfqTjsulAxS3C24f3XwSUxPejy5Cp0OA-NwjncyZinWmXVCERQz9Oa1vq4hDSFWNaN3YN0QmbUpb79PLSdl0vwKF3nZBX67xat5ykQgVe6bMZYkFOQu5YU8EhBeN5-12SQ0AH2oSj7d4jc5GhRucznwpL-8Jzv14FzNj1GnNuhDvg",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "946 South Bonnie Brae Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0509748,
            "lng" : -118.2777043
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0523224302915,
              "lng" : -118.2763912697085
            },
            "southwest" : {
              "lat" : 34.0496244697085,
              "lng" : -118.2790892302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "89ff83148d632c05c1084e51d85adf075170c85c",
        "name" : "Ramada Los Angeles/Downtown West",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 3000,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/109586682748042992521/photos\"\u003eRamada Los Angeles/Downtown West\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAd78gvu4bS5rA3zUvYhKRS5n_VJFd1emMq9BMtKQbS1Hv-_qsMYTULTm4iHs4xaZhY36t13jbOD5aWWhhVjp7wUm22WaOsdw0uj7ya_XC6SvY5i7GbHK62z_tQXJTItE8EhB6rA_jVACcDA07Esu09rq8GhSRE7yB4XeSSN3RBwvNK-CU8bo1yA",
            "width" : 4508
          }
        ],
        "place_id" : "ChIJZbi0Q5jHwoARaQEG2qWzG8U",
        "rating" : 3.6,
        "reference" : "CmRSAAAAtN0-TPh1QXEJRMfZ4jAtwdOlyt66jfNkqj2KCfptPo2LkGS9S9tVGj__smHHRRTEKxs3NxKPo8IGCXQ6NQ_srHm9krkzWaUvBh-Ewb2NyI0LCXNER3ecNXrosLwV3EVGEhCciJwfuvrvX1pai07n-eBIGhToIYHZDtHS5Wz7qoZa4liwVzbj0A",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "1901 W Olympic Boulevard, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.050625,
            "lng" : -118.278111
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.05209573029149,
              "lng" : -118.2766928197085
            },
            "southwest" : {
              "lat" : 34.0493977697085,
              "lng" : -118.2793907802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "a75154fd03f8a22bbffeebcb9335392346cbbda0",
        "name" : "Rodeway Inn Convention Center",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 1638,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/111539862706078957445/photos\"\u003eRodeway Inn Convention Center\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAzE9eJWPYxtbYMLukDMUmCUGJK0JHwUx3JzZoMyGqg9Ai6aDKi_rYVsTy7ccCWuvO4r4hTjRm3HkyWwscg-Q_UIIVI7XhKIjRsVeRU1m7jJqS3848R_aXTlgG9Tc1UbDiEhDrHBnNhZOVTrUQKyxL58rVGhRP-ChLBWidDpH9-ZK_iEkCHg3XPQ",
            "width" : 2048
          }
        ],
        "place_id" : "ChIJizLTRpjHwoARvGmF-tkC3_Q",
        "rating" : 3.7,
        "reference" : "CmRSAAAAeFjSy2Fq2erNIS2mySUbXNKrFeU6ARVOsMO3KklpuEipwj7toHSQk5LAKe7hhuNa3LcudIMPvZFvBYOQtcKe5br1gip31pv-8d4TtMOs7p5ngX2rUsltUkSvRBKF5UJrEhCwmXmBVVIpTLqBidrJsQSsGhQG7o0_cKXo3x9jfhBS7z6NzQzMmw",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "1904 West Olympic Boulevard, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0530125,
            "lng" : -118.2786071
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0544487302915,
              "lng" : -118.2773167697085
            },
            "southwest" : {
              "lat" : 34.05175076970851,
              "lng" : -118.2800147302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "f9204116d1dca9b7bf28efab7e5a5bf41787754f",
        "name" : "Americas Best Value Inn Los Angeles CA",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 1282,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/107059080345595827050/photos\"\u003eAmericas Best Value Inn Los Angeles CA\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAARGIpCqcqrahx1OqHX4SHUBfAS3JCVAs2GUCd-j6pksw1yOKmnY8qavM4uCluSZo5rCvATJG2j9-HJ0m52S8qf6pETTkZwL4FgXhaPR8VrWIOHObx29JuhS1jcbqGsIQ0EhBdCtosIHJvf3NUit1FpB9wGhT7l1in6F-EfGlSP9vHdPx32I9k7Q",
            "width" : 3601
          }
        ],
        "place_id" : "ChIJ153T3ZjHwoARZZ7T4agCDwE",
        "rating" : 3.2,
        "reference" : "CmRRAAAAeRtd9Yxc4ewY8AP5XpX-CEbpaWLq2-AfZqu_K9tu_QBUfOi6SiM7yF2h9QRE4vsI93txx5XbD2qj1QQWQMSVpgC7jxK6J3xjYWxdDoFGsUex9LalBQeoNo1CMJeZFWXpEhDiWpATGWXqTO6DEY55NFV7GhS-CGDnojNbAlE7pMcDqHR7hfebJA",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "906 South Alvarado Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.027281,
            "lng" : -118.133799
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.02846643029149,
              "lng" : -118.1324323697085
            },
            "southwest" : {
              "lat" : 34.0257684697085,
              "lng" : -118.1351303302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "cbab4282bb73a8bc9e66708c66902c0807c9b334",
        "name" : "Hilton Garden Inn Los Angeles Montebello",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 2988,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/106425483912089009062/photos\"\u003eMaribel Chacon Torres\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAuvu7c9gUQwu9ohUvORQa-v3pw4C5bIYt9sIznFMxAi56GWeDAJxV180PYa1cadJUO5bXzAtAx2FR993yp9RFd8ipP23MYpWHKEMYQFGgH4hkpGPc4Yy-tmIiVa3gusntEhDjoNGNtKrkWwaPX5TxP8RLGhQ9rkfP8W1rAANdH3sYP_xT6PaC1A",
            "width" : 5312
          }
        ],
        "place_id" : "ChIJ02JT3cbPwoARaoOYXaf6Atw",
        "rating" : 4.3,
        "reference" : "CmRSAAAAFCiacy8PCK3uaeVGCO-ZfO4dQ3mND_wY7bjJuPbRhQMYb9HRorbptr0dYetI2KePj0fjbaVj3VH80N82GWxijvQ3cOozTCkhqfqP2V-l7Uf8VQlZ-M0MI99rm-QJMt0EEhCPce7jheINPfliM4cEo6DkGhQMmrtfCczoVHhUN9xxYnMUzYV6nw",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "801 Via San Clemente, Montebello"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0240837,
            "lng" : -118.2788468
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0254886302915,
              "lng" : -118.2774874697085
            },
            "southwest" : {
              "lat" : 34.0227906697085,
              "lng" : -118.2801854302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "986358b38de3fde84589943157d050da9b3203c4",
        "name" : "Vagabond Inn - Los Angeles at USC",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 667,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/104590040118984006715/photos\"\u003eVagabond Inn - Los Angeles at USC\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAcpSJJY_N9qQwu1llt5PKrsF-BI7DEGyuBHmpMYY-yCMthVXIeznZFHXl-6xZEtYdarsMt7YIh7sz3SH7sv-h2aMhuH-HqkcqzbcJnCChvxuoKTYAW_I-p1MQvh26pePbEhAlmoSiUbuxodYrRNSbCJImGhT8jlMWm2ohKbmo_fMDWB6P_b5_LA",
            "width" : 1000
          }
        ],
        "place_id" : "ChIJ94DDJufHwoARxnB-MpmpRs4",
        "rating" : 3.7,
        "reference" : "CmRSAAAAKqMfdcf1txku5S4vHqEvRkc5hJ6euLK0spve3H9rMEY5llB9TYV5IWdFz9oX22CIbj73NCDDhcAPCQLV0_zB2gmpYIZSGHouc6-FTonV_Ph7aE4PKBthyrXgjU64yb1sEhCYGJpDtnj1EsM15P0gzNHUGhRYfpn0b-bw09wOVue_LulrEtIKDg",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "3101 South Figueroa Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0634278,
            "lng" : -118.2932817
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.0647379302915,
              "lng" : -118.2917600197085
            },
            "southwest" : {
              "lat" : 34.06203996970851,
              "lng" : -118.2944579802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "828c8f263db7a6e6638429a822db8132be046d2d",
        "name" : "Howard Johnson Los Angeles/Near Convention Center",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 257,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/112374819000094536726/photos\"\u003eHoward Johnson Los Angeles/Near Convention Center\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAqVUiuZO6t26oi_TpNp5m5A-9RRXpprK2L_dQtJPKW6ohbfg6jQEEHdZJwPrcXp_43x2NPGsWhNKNiCl9zHDXJxwyrxtx9404rzvVr9KnucS_pLlsuEFRh9rUpZ7ERUsgEhDReK1CoBUdNsRu3ZkGSZooGhTiStplbN8Hoh5OL9hBIAkirkmM8g",
            "width" : 338
          }
        ],
        "place_id" : "ChIJUfdIf3vHwoARvcI-Kyvke6g",
        "rating" : 3.6,
        "reference" : "CmRSAAAAsTrizZzFf0rTazMX3PyeuurOOA52J3yZfvW7E3DqUfTqaUXCulrAlF-iq7b90beK7wK1JZ6DejycC-AxRVh6m5VXBHzMc7fC1jGK1G0RMn2MfjE7iqgtgkreaJwwf9UlEhA8ojlcKtmjI39Xrqr3nsmyGhRoPZ5ssBZF04ckjkm2LLe45iZz7w",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "603 South New Hampshire Avenue, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0038873,
            "lng" : -118.15066
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.00578833029149,
              "lng" : -118.1492334697085
            },
            "southwest" : {
              "lat" : 34.0030903697085,
              "lng" : -118.1519314302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "345fc27fb0cefe8e81ecd7c9b61967dcdbdb77ba",
        "name" : "DoubleTree by Hilton Los Angeles - Commerce",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 380,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/116512853123968905382/photos\"\u003eDoubleTree by Hilton Los Angeles - Commerce\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAqm_UN1YU39ky44p7CuyWJSODeU28e8Q2BzyhQ1hG_L2NoxtSOwezjrKwILy-Rr5rQL6COq08K1L9JQEHPR9E6KBsa7Oz26NlkOUkfAKq3UdPoz4MzlxNSJkW8WQwBY6DEhCQoSffQ9UNjOKGPRUcrmgGGhRsBS8KAPwn-OATW9ro7Jg-8ZTosw",
            "width" : 677
          }
        ],
        "place_id" : "ChIJkbRj11POwoARgt0cgCbmWpQ",
        "rating" : 4.3,
        "reference" : "CmRSAAAA5DqaQ_cz6NSCEPT3FUyQVBQVwsxspYghSC2-6rehRQHfXUz6jAVrGr2F-J7nm03uW8gjFPyYscdZpG4Xf61WCZKF0CccMvkiV0piBNcsv75e9cYBI-TibNbZ0tA3T6JbEhDqBz_KouWj3fHb0cuFi7v-GhQQ-b9I-F_ZNB--IWAoQlHsVoTh-Q",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "5757 Telegraph Road, Commerce"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.019248,
            "lng" : -118.281159
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.02069848029149,
              "lng" : -118.2799845697085
            },
            "southwest" : {
              "lat" : 34.01800051970849,
              "lng" : -118.2826825302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "7d7bd0af8dd790ca88a206bb32301a72c1401f25",
        "name" : "Radisson Hotel Los Angeles Midtown at USC",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 400,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/109389517525422772853/photos\"\u003eRadisson Hotel Los Angeles Midtown at USC\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAADaZtn6kd18XGQ0izc4F_0LoiU8jUJAMDHTeruJm8Q5YT4O6a6t158-vucIKnZ2KY10y7h95gWZ6bhALpzvYam085UxJqmk5VBC6oyODjWqWg-SpxlqlZVA0Bkhp91iCREhCHfPmzMhZo7UN7s296rd5lGhRRudA9Yx29caXCRuqKoE7qdAqogA",
            "width" : 600
          }
        ],
        "place_id" : "ChIJieGyj-HHwoARwBlGRspb63Q",
        "rating" : 4.2,
        "reference" : "CmRRAAAAeIDs_OclH-sBIYcgS9QYJpe5LjwmxClZtNM4rcvIHWE9l7lf4Y6UYYBaZKiOTx4zAu5RFwYWvYm2qB6HK9IxzYeJw0i7LKLJmzVb4acCw-BekunuKRud6lpSUoYQkvn_EhDlyNT43lvzr_4a5u4oFArWGhQD-d1rJEtIT-_VLSb1tg0DOs-80g",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "3540 South Figueroa Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0930997,
            "lng" : -118.2913237
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.09444833029149,
              "lng" : -118.2901945197085
            },
            "southwest" : {
              "lat" : 34.09175036970849,
              "lng" : -118.2928924802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "55e55c0140fada62e5b17704dd02957fd86d20fa",
        "name" : "Hollywood Hotel ®",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 1224,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/115377825740419578008/photos\"\u003eHollywood Hotel ®\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAeDuH9YOvEb50fyf7app-oBvN2mKQVmX45SeuiwAl3Ulic7kszeOHmVcReorGEsqmKeuiNH1Iuih6J_o93Q5Bnz--vOFfv-mrkcxe3aB9KWtFInMV6mck3EJXzDbo1BvCEhD_zabWbtaMNtW_dFOs_nfMGhRlj5G0bLZ_5WEwwdqW8_l7kEhPbQ",
            "width" : 1632
          }
        ],
        "place_id" : "ChIJN1t7xlPHwoARk4BjW2tKVYY",
        "rating" : 3.9,
        "reference" : "CmRSAAAAJ_9EtVIS3otCguVBw5ioGw6Kuw6Zw6wq9uS_MWIQuSH_RoGwSWwgEoXahl7M9GUUfUGaPnOt1e0ld5nX6-uCSyiTlNJbYKURYhT36cFBIENTDkgbw5kh7rR4WFyoc8WOEhBe1qzn-yEK1b0OCKea46t1GhSBI6FmW_U6JxyInA2gAtwUOh10Ow",
        "scope" : "GOOGLE",
        "types" : [ "night_club", "bar", "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "1160 North Vermont Avenue, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 34.0427139,
            "lng" : -118.2641203
          },
          "viewport" : {
            "northeast" : {
              "lat" : 34.04412333029149,
              "lng" : -118.2628595197085
            },
            "southwest" : {
              "lat" : 34.0414253697085,
              "lng" : -118.2655574802915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
        "id" : "55de6596381562804fd0bf39072db10d58948602",
        "name" : "The Palm Los Angeles",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 3456,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/114922158701583255492/photos\"\u003eThe Palm Los Angeles\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAGioK7KWazHrhSr8oQc_6FYRUHeaBmWQdQ6JuocsS4KUZxVKcZYYk6pLHWGCymzR3iXRpwEjtiBSe0sKpUxT2GuPK5ABWcVgUIXk07U_qSrR1zX3-mXjpepZ-JEYjCzsyEhDnfs3l8olOpNdXrAogmv4AGhTBKC8Oj4ZZjEtZMSPs5loFod_txA",
            "width" : 5184
          }
        ],
        "place_id" : "ChIJHzTE_rfHwoARgBF31zP2rZY",
        "price_level" : 3,
        "rating" : 4.4,
        "reference" : "CmRSAAAAGt97vWVPwsGXyx8PfKfrQ45V9vea-nf9Ug5QT8Bsun5wZ8lWm55dZHWQwaoCA6op3nfUoPC2d6LncmhIYRzs7B56gbdIppI4JXXaEdR7f0rZsqa9CWpKwePHkxi9tJZzEhBsfftt6zHlT7S1iJCAhUvAGhS3HYPQMI1hGveztm_pairh0_3lNA",
        "scope" : "GOOGLE",
        "types" : [ "bar", "restaurant", "food", "point_of_interest", "establishment" ],
        "vicinity" : "1100 South Flower Street, Los Angeles"
      },
      {
        "geometry" : {
          "location" : {
            "lat" : 33.982449,
            "lng" : -118.229728
          },
          "viewport" : {
            "northeast" : {
              "lat" : 33.9837977802915,
              "lng" : -118.2286466697085
            },
            "southwest" : {
              "lat" : 33.9810998197085,
              "lng" : -118.2313446302915
            }
          }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
        "id" : "c27b7591f3b41bcff9311daa42ed6a4ac4ecbf99",
        "name" : "Rodeway Inn Near LA Live",
        "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
        },
        "photos" : [
          {
            "height" : 1638,
            "html_attributions" : [
              "\u003ca href=\"https://maps.google.com/maps/contrib/107540410847274733803/photos\"\u003eRodeway Inn Near LA Live\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAA8RSrtKtJ6S7SOPBgesneofFyh8j_oxt_Akna40Cb_y4gCPvNUgh0ypUPf_IDeXY0oo4wS2tuUHu_yf71qiA3VSGmG9SQ1YLxg-F8eR2v56ZzPzNEM0ZxV2d5KY5cZ1gREhCJUVKDoq74kqZlBXuFNwkbGhRomqq8UvEUB9MDg5_Q2Z3g54rEnA",
            "width" : 2048
          }
        ],
        "place_id" : "ChIJsWpLkBjJwoART1rnEEbkzc4",
        "rating" : 2.8,
        "reference" : "CmRSAAAAFjZbhqnur6Hdc4koCL2OQWSuTIOOqRaAkbI07xi8Iu9rY_vzp90IzfpbJUr2aedRIcpTZoVr6TiZKsoiSPgEh-caNzMln-Y1GJOAvJlb5tVNNvEjtL0aQ6sp0RYOLNFkEhCqYm_m9wzNcfl5DTsL0wNWGhSbKkX7DSfu8qbpP1iC5rkg4GeYfA",
        "scope" : "GOOGLE",
        "types" : [ "lodging", "point_of_interest", "establishment" ],
        "vicinity" : "6340 Santa Fe Avenue, Huntington Park"
      }
    ],
    "status" : "OK"
  })
});

const server = app.listen(5200, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
