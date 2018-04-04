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
  // return fetch(getUrl(`${baseUrl}/maps/api/place/nearbysearch/json`, {
  //   location,
  //   radius,
  //   type,
  //   keyword,
  //   key
  // }))
  //   .then(res => res.json())
  return new Promise(resolve => {
    resolve({
      "html_attributions" : [],
      "next_page_token" : "CqQCIAEAACB44WKNhLcdzd5B7BM8liyHeB5oNV6DZ1Qrh-qd8-7ctSqlsFT7XH82nRS3yuqdB9Is2zbUhGRR8Uv6M5YRl3F-RRMAbin2AW7LDQa6Gg_J9oG4dy2bcwEZCOBWQObZEHiGautH3aZzXyp62xsuNpuReW0VfwKns1t6LZxkO8ZIrmrRv9T46b3AadQ7kSj7MqGkFeTXnV9z9ZCX8HBD2Uc6AzWd0oAPr-2BoALye44Mfd_dQJHm1dGFPXNth3hkttN1uVGzejMzI6KoG5mp5yTSFpRnWMc7MsjJVUrpR4K0NtGVR7A5QZeKHQk5wwH3z_azbZLoXFnWcKjUZfPT9zNje8_cPkOXZfLDNVQwz02ShutV7KJcHrtABHPzjXUJxRIQLlJEwev-CkSuPwWjKMJvtBoUzNVviuZrEl2Ef3gUuRry2Ut0Zfg",
      "results" : [
        {
          "geometry" : {
            "location" : {
              "lat" : -33.87036190000001,
              "lng" : 151.1978505
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8690162197085,
                "lng" : 151.1991288802915
              },
              "southwest" : {
                "lat" : -33.8717141802915,
                "lng" : 151.1964309197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "e58f0f9ecaf15ab719d305b93265cafc00b01a3f",
          "name" : "The Little Snail Restaurant",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 2448,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/104189592240515909264/photos\"\u003eJe Babate\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAA0h-TilFyzdG1ccHava-NXSKo5HQByyVe3XPZh4ha1TdBqj9QDU1-MlzeiLthK59yu4JBo4dja-_VwkrJAYCaYDmqEa4qxu_H7nuCdOnUPrlqxejT7H2XKJ2xkVF3TFYhEhAzIrMrpiD7Iz4Ji_vmCI9AGhQ8sAxwEspG-XHq5BJQX03tS9uAkQ",
              "width" : 3264
            }
          ],
          "place_id" : "ChIJtwapWjeuEmsRcxV5JARHpSk",
          "price_level" : 2,
          "rating" : 4.3,
          "reference" : "CmRRAAAAklOvIrcnMpTVaJC7v703KumgrELBZ61EvLnmvlhBKqPClbpGBrxL8nn4jbhUKBL-qiSmlJIh4J4Bf3UM_zQ0nzZnkxboJsw7NKvFURZ43yc4NTj36X42gjzKm2TRbvXPEhDZ3kZ7iwCQ1GpssUXgm_ydGhR6lUqb-koyNJHKGeq43WpqiUYT0Q",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "3/50 Murray Street, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.867567,
              "lng" : 151.193742
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8662180197085,
                "lng" : 151.1950909802915
              },
              "southwest" : {
                "lat" : -33.8689159802915,
                "lng" : 151.1923930197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "00060cf64f16375913ec49d25cbb7829d3e08a88",
          "name" : "Blue Eye Dragon",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 2723,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/114550096924148386356/photos\"\u003eBlue Eye Dragon\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAAH9LBeH5aYVMhPmd8m3M2Lqt4Blg9RbzcqbmxNk1kOkA64SBuHjiUDkpWLs9_M1Lelc7dfjFgWJywP90jSE1-YawMoF9n7zUgV24BDwC88d6foli2W8CGM42VL-U4xthzEhBQv6SOANS_8Ao4m7rxLwwgGhRgzFA3Twf6PXFSvciEVW6PiOIsFg",
              "width" : 3776
            }
          ],
          "place_id" : "ChIJuZqIiTauEmsRJF_TK9Vpfmw",
          "price_level" : 3,
          "rating" : 4.5,
          "reference" : "CmRRAAAA_6kof4MWJW-W22fhXeXU0Tp3v_O4azqqV98eTszH6Kqhx3SB5uYnLhXImufzz2zkj-3RdSQp064lSO31szd95dn2zIs0N8xjPsEF1Il2bAhE0Q7TiuWtHQr0vBPe40SbEhBVKnfbMLP25sE5a4pyhSX9GhQ5iiGc7iWgcWg7os28lqes9gC8Tw",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "37 Pyrmont St, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.8635961,
              "lng" : 151.1945233
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8626470197085,
                "lng" : 151.1953723802915
              },
              "southwest" : {
                "lat" : -33.8653449802915,
                "lng" : 151.1926744197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "7f4a3fdd07bb7911b51838d1c9055b08ee1c9293",
          "name" : "Cafe Morso",
          "opening_hours" : {
            "open_now" : false,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 1366,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/113583986869543550599/photos\"\u003eCafe Morso\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAAzuIJrap9dckeFXdU5ZIN3FJ36EONrqVunpna1uV5DN3x0Wyvfzpf0mz_YmcKVky28ng06SgUzPZnt6-30Qjj3TKuwbTNZE5Lg2sO4asZurPTfChcLgXMih3r4nSHOD5cEhD46e4B-YEdwgmQBvj2xEBPGhQ6pwi6CFxiBO-cjDcU-GTYmXWxlA",
              "width" : 2048
            }
          ],
          "place_id" : "ChIJz2EHuEmuEmsRN_yScfn88Ec",
          "price_level" : 2,
          "rating" : 4.1,
          "reference" : "CmRRAAAAYODvaRdDYO7AH82DkxoAvNcr9--s57uMYqo3XT-kQazdOTcvewv6UDbdUKT0m8eVA2SJmVWE4XPAKnYx5tGwP74jIoIPQ-8QNomDkLkP3ARGUJY1oUCRnFAz9dkt2LoKEhCGvEKJmpq7YD7nNFSFCM2lGhTSCCz-0q05INPHIQWqK43GG8fZCg",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "108/26-32 , Jones Bay Wharf, Pirrama Road, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.8679708,
              "lng" : 151.1952102
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8663504697085,
                "lng" : 151.19779985
              },
              "southwest" : {
                "lat" : -33.8690484302915,
                "lng" : 151.19280965
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
          "id" : "44fdc977984610cd873c790a7d850e8185ed0e5e",
          "name" : "The Star Sydney",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 992,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/113847902696343041106/photos\"\u003eThe Star Sydney\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAAzQnlSkItOWF78xSEtQ7WqmrWid6rr0pb1mXDPqCVefylCoY_RwDKmCmGkCrL5lia9e9h5a17WU0oc-P5VG8aO-amB-eczcZLIB9WL-x2pnNabQNdmWCtG4UQBdL56yfWEhBL37vzqYMgUDh7PUZJCT7gGhQla7gE-67BJK98tHn2k_e10m-blg",
              "width" : 1034
            }
          ],
          "place_id" : "ChIJq6qq6jauEmsRJAf7FjrKnXI",
          "rating" : 4.1,
          "reference" : "CmRRAAAAhUwSjc2_zJ80qyMyruVZmMFFU7qDGMevg5fh301LsqusLHVPtEWQtxJ3y_-sjumcfPyCW_gyibLDGz4rkROoVPxDsKzcFDKI3tKqEI1fBDuYiLIn0k-kIKKdAXJdBm6KEhAHH-9FFvJf2T4zHBBcsbgcGhRHcdFPqAOWMQTajfyMM_VBHdIEbw",
          "scope" : "GOOGLE",
          "types" : [
            "casino",
            "spa",
            "lodging",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
          ],
          "vicinity" : "80 Pyrmont Street, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.8631871,
              "lng" : 151.1952316
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.86235935,
                "lng" : 151.1959229
              },
              "southwest" : {
                "lat" : -33.86567035,
                "lng" : 151.1931577
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "05bf6e9aa18b35f174f5076c348ce8e91e328aba",
          "name" : "Flying Fish Restaurant & Bar",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 3036,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/107060393183737407591/photos\"\u003eScott Savage\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAADZ3en5YYJWY1Qwlo4nyy9IMyAfnDG_pYOB2rWCvm1nhnw84FEjB2E14UVuuKRxD2QXJ8uHyo6jJcwr4nsgjKSlH3qjiOM8SPTiRYqzzXHcSoQldEoGuLrAk3ebS-SiCGEhA5Xx4qkx0GZASzVFwl4MrWGhS4Oo9wIaeQXcg4HKO-TZWQ-wyYPw",
              "width" : 4048
            }
          ],
          "place_id" : "ChIJm7Ex8UmuEmsR37p4Hm0D0VI",
          "price_level" : 4,
          "rating" : 4.3,
          "reference" : "CmRRAAAA3Ps-S5uG1xri84oI2GcQVXbMRlXnAmKQkuUgMgJBTj_3e6T0TQ5JDpjQp4azW34e0AC1Rm987k6dXARASub4P5kL_pEUzTn-xEHcr_8mW-eiRwKc1iZIfXELy1lTeTmjEhBurOiDPqJocpeYjlhFCxDNGhRRUSrEhE8d6fk6u_hd8kEvOBY1iw",
          "scope" : "GOOGLE",
          "types" : [ "bar", "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "Lower Deck, Jones Bay Wharf, 19-21 Pirrama Road, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.86887470000001,
              "lng" : 151.1955128
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8675257197085,
                "lng" : 151.1968617802915
              },
              "southwest" : {
                "lat" : -33.8702236802915,
                "lng" : 151.1941638197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "a946d56ed2464a60ce54305c2f011e71617a7214",
          "name" : "Flying Fish & Chips",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 992,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/109058915883256959588/photos\"\u003eFlying Fish &amp; Chips\u003c/a\u003e"
              ],
              "photo_reference" : "CmRZAAAAE6nU6Uzgr8WAqEbMCZ7IfYCeNikLDAa9wKXWTdudrb5aAGRdERpx1ak8JACcq2QAUUOLnytGlcWBpu1kCUKS4pdL7ERRxfan09tLogF6g3fypqjKfZVH6j6u5s9CFp3AEhDfc5UezhK7gnUVnwP65pEZGhQq2cOlwwMqVVhiKFI2-0-fQx_QPQ",
              "width" : 1494
            }
          ],
          "place_id" : "ChIJ1-v38TauEmsRM5ybcRx1Zc0",
          "rating" : 3,
          "reference" : "CmRSAAAAYaHiflcT3GxuGj8EojPHgKyMgLvrkxyVubG-1UcqjCJ9KirdXTNmY-GvKOkFmClubeolDO5zAOyL9p_7-sKd9xXWmo9o_lv0mAYKph6q4CLiUYzCiBpW0YCAk4ITIQ7VEhAD4B1vcaHjARmxAu40P5s6GhSyU-LCKATwP4DoFy_eUPTU5N-mJg",
          "scope" : "GOOGLE",
          "types" : [ "bar", "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "The Star, 11&12/80 Pyrmont St, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.87089549999999,
              "lng" : 151.1947888
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.86957021970849,
                "lng" : 151.1960793302915
              },
              "southwest" : {
                "lat" : -33.87226818029149,
                "lng" : 151.1933813697085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "41fe888f006a6d0f37e7488dafecca04079b48bf",
          "name" : "Crust Gourmet Pizza Bar",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 1000,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/101459543542277990029/photos\"\u003eCrust Gourmet Pizza Bar\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAAR7bG0nsLYa3_esElIdZomvLE7HXsTsp1e3lJwdydA7LVz5ftJ-0iJNZu1eBFzFQGZ3JyU00LM6joiTs2cqI2VTun700K95DzWMRDxCXaM2Ho2pbuR7KUoBL4wxdK-GP1EhBREKml40m61_Ilp6iCXocJGhTO0dzAt8kWF93oN096r337NZI7EQ",
              "width" : 1000
            }
          ],
          "place_id" : "ChIJHzxiOjGuEmsRgPvPsWpO_eI",
          "rating" : 4.3,
          "reference" : "CmRSAAAAQKlB4PRYeCDWXctZNhUyE0YQwYx-1m0Rq-Fu-yQDfPnnYFhjJZ31dQbipx2i6K7tsPcU7SIi5sWy2OmQug4i52oJPUg3D12LxGZSD4eeaH6Nvkq4WRO3M2OQLMnW5_oZEhAkJhZAfhdM3rvVQslUSwEYGhRmVbitL7Bg5taKTXhtPjbC5EdczQ",
          "scope" : "GOOGLE",
          "types" : [
            "meal_delivery",
            "meal_takeaway",
            "store",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
          ],
          "vicinity" : "208 Harris Street, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.86679699999999,
              "lng" : 151.1973652
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.86554701970849,
                "lng" : 151.1990320802915
              },
              "southwest" : {
                "lat" : -33.86824498029149,
                "lng" : 151.1963341197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "dd030d236b8ccdc525f7a40893eb492f8fc5d55d",
          "name" : "LuMi Bar and Dining",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 3024,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/103540943985308121435/photos\"\u003eJani Patokallio\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAArZF3WgyP3WRgurnzxMitqIdL5F-zE-QuuOmwRtVpPbBfwWXWs8PztDzQR8kI2ixgeASxQLRc_KnjNpxTfSZbioAWKP9AB0YCKC_Waro-BYPsAFlgnq5LTNojchaeDsPMEhAJnG9_oLS7cGZhqkSCzrqSGhQRXz6BKSr6wiFNUctzn4beWf5QPw",
              "width" : 4032
            }
          ],
          "place_id" : "ChIJDZzo5DeuEmsRsi1wzrIp6HY",
          "price_level" : 3,
          "rating" : 4.4,
          "reference" : "CmRRAAAA8v1qo09z5iQ-FVhMgN8TambP-_CTtISIziBj5GvOfsvDSVas-47zZ47yGTs5M5t15LSow_XRuXUsn8_rvY_L0m0Du_bDxQ1TUSP2qSfBJO6xFxuQJxw4ErwOx7eTZqTNEhAkAS4k3ubW8RPhs2paAPEMGhQuuqJiqk1Crh45kZGtevwulTWivA",
          "scope" : "GOOGLE",
          "types" : [ "bar", "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "56 Pirrama Road, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.8669667,
              "lng" : 151.1958862
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8656646697085,
                "lng" : 151.1970863302915
              },
              "southwest" : {
                "lat" : -33.8683626302915,
                "lng" : 151.1943883697085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "id" : "7eaf747a3f6dc078868cd65efc8d3bc62fff77d7",
          "name" : "Biaggio Cafe",
          "opening_hours" : {
            "open_now" : false,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 3036,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/113610891890774395703/photos\"\u003eBriggs Soria\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAAdJKKgWGh7Tb9UN7TPt00cGvH8ipP3Wz_OFwAYBfHCHndLaQSCykEwvVaBfpLfzDMTtazxKRkVkP06lXbAe_SMgkhjaw_WUOSRJRNPezmmwwRe1BpoJdy9TtDx29JqJIOEhBCvFLwhIajl2ZpUh0xVqpRGhRA_t0m6Ql5EndN7FIoykpKPB8lbw",
              "width" : 4048
            }
          ],
          "place_id" : "ChIJIfBAsjeuEmsRdgu9Pl1Ps48",
          "price_level" : 1,
          "rating" : 3.1,
          "reference" : "CmRSAAAAagoClMApGpHnXohwexAjofi41sopIficXm6VbCpo_gDPmCsqDqWicjAUBhX_Nj8EX_IoPWHuvBB3JFsN0ZUyNIUfxRfznLzQZ6yLMC23frwqzT-nc1-YP81NAaClTvI5EhD0VLzglMfc939ZAN5W5O3HGhSPyQG_i6HdruZ3dIBQR6bJrEYsFw",
          "scope" : "GOOGLE",
          "types" : [
            "cafe",
            "store",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
          ],
          "vicinity" : "48 Pirrama Road, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.869482,
              "lng" : 151.19551
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8681330197085,
                "lng" : 151.1968589802915
              },
              "southwest" : {
                "lat" : -33.8708309802915,
                "lng" : 151.1941610197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "da9e8b2410e6c72234cdae5423a5198a92f43765",
          "name" : "Sokyo",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 1536,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/110589195671485646601/photos\"\u003eChopinand Mysaucepan\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAAZ-WXM2i-wPM92bkqLUJI80x3tKtlWZ8PmuFOgFE4fhZkoCwGUOWE4uYwLj53EiCNMH1jkWbWF5PVgc7Mi2WQgGNJA3VWGj29miHro7dnTGhjlm0m5Wuq6bJsbDvl6PwvEhDx7gHysiVFIyxrmugv1_PeGhSeugfzDlekdzQWIo8HNHJYNj-BVg",
              "width" : 2048
            }
          ],
          "place_id" : "ChIJq6qq6jauEmsRAnuISz-f1ig",
          "rating" : 4.2,
          "reference" : "CmRRAAAAfU6hEub5k6FdkqxGEFVpz2OHjX2ObLzMXhqbwh0PJFzdAmEa5tMzirn6jT0G33jVdsXcFOSgxHStbJdfQ8OhijMLT_z3sUz_AWCnXTJJ94QYJ6Al9ibKvmTFNP0nZ2wLEhAZKMJUOzMd4PQaCa-mttELGhT_umJovFgzeM7glzS1EjQhQWp6Rw",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "Level G, The Darling The Star/80 Pyrmont Street, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.8695812,
              "lng" : 151.1959196
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8682322197085,
                "lng" : 151.1972685802915
              },
              "southwest" : {
                "lat" : -33.8709301802915,
                "lng" : 151.1945706197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "690e0260be4d96e619d21b7a874200f0bc374e89",
          "name" : "Momofuku Seiobo",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 3036,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/102947155740486290254/photos\"\u003eSuan Yeo\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAAb_eJ9jDsRDeSy1NIk2oS7oOGa_aysBoT9e5mglJyh1yWC-j-a854CO06HFS7BGeYxNU9u2VQShdR-a9yy3J8HY5M_VpbrXojwhlMTz9VmxS-Bxke0ee8XQIdNdUkMDyAEhDLp3DZqCwhSQ8PX5lwpqGiGhQOY2aP5d16SVoTezSUtKkdQAzrFQ",
              "width" : 4048
            }
          ],
          "place_id" : "ChIJq6qq6jauEmsRg6MWt2pdd9U",
          "price_level" : 3,
          "rating" : 4.3,
          "reference" : "CmRSAAAASM5KT66cgJq7fsFKTYmfmmoxVUDrlrcg2Oleyp6SO9M8KjmGXF7xJLm7powjT5YIQRbjuDraiD2ZufmYDjmxvEQ6tuJ-Qepd3EAw-ctN4q9-sPFrNmHsMNzist6cbZxiEhCm6-PuWsbltnOygND_vIi0GhRlOeaj5_StSAWDJbcNBYtv5-3EFQ",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "80 Pyrmont Street, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.867548,
              "lng" : 151.192403
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8661492697085,
                "lng" : 151.1938676802915
              },
              "southwest" : {
                "lat" : -33.8688472302915,
                "lng" : 151.1911697197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
          "id" : "c64ac8f4f8bbb20c53d0fd01ad370fc761039c96",
          "name" : "Pyrmont Point Hotel",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 1365,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/117219302751533396373/photos\"\u003ePyrmont Point Hotel\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAAZb1_U11r0pJAzudwAIVXJSUgiTwg9kVxVFeODxIQrvEBBY_QwPeXEGEBf-52c1XoKVUfWC_dmqphjod-ufRLqCANSZb-S5meXcHkM8bgH1jAJ0yWJlYsH9_o9UqKDu8UEhDU0DHH1xRZEyGtWujbuU7xGhQmp9ZKz_DuwqFfWlCNmZnMtXrw3w",
              "width" : 2048
            }
          ],
          "place_id" : "ChIJF7vWPDGuEmsRVzDtwB6rZAw",
          "rating" : 3.9,
          "reference" : "CmRRAAAAkCYVrau4LtOMG6NaRY3KKO-zwE6_MVH_LXEolDwoTUTZaZCdgMkDld9AtzLZERiC0JqF9k29J70a16S58qnjTHB_v6NewKQRBzUYFOs7fOEmTxpgkVYO96M_COlUJtfgEhBT3mKjJ-f23xDtA-1p5VFGGhT5vlSs8Cg3Ae9BflrfCHwGYMfb9Q",
          "scope" : "GOOGLE",
          "types" : [ "bar", "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "59 Harris Street, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.8687827,
              "lng" : 151.197483
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8673767697085,
                "lng" : 151.1988352802915
              },
              "southwest" : {
                "lat" : -33.8700747302915,
                "lng" : 151.1961373197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "40613457b333faaf743ffaee66dc5f8fc7eb4238",
          "name" : "NurMuhammad Restauran",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 2003,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/106330975929883136655/photos\"\u003eIsmail Jazlan\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAAOel-zA62sAlEOqoCClIeUUq52mejjI6oKIpG1JPspHQAnsDK610L8FFsxkWjByP3q963sdYUlUgY33ruqbli4CLLw_A5PIpS88VHAXAuqTqlWb1c50iYWCnQDfANq5-GEhDM4oQpqpXLGQeRlHAA5oNSGhQM8bCiAoVgPX-CUXHYGrsYGyvtZg",
              "width" : 3000
            }
          ],
          "place_id" : "ChIJBQpfDDeuEmsR40AkLqcWsVA",
          "rating" : 4.6,
          "reference" : "CmRRAAAAHMiQlvvn5W7-Yjh5B27gHdNTo-_MdEdjXb17aOj38P71DSqxlNU3dVwlZUSEzU7QxBkuA86CEgzQOdESSOgzvcTKuEAO0gz-PsJbogkGt1tFgcKfdACqGw2sP9j0TzlwEhAuPgAJAcpqAKpwrJMxvkMlGhSn4VOQvwd93raaT_8-ciiNU5lEOA",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "52/54 Pirrama Road, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.8679658,
              "lng" : 151.1952022
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8667970697085,
                "lng" : 151.1961142302915
              },
              "southwest" : {
                "lat" : -33.8694950302915,
                "lng" : 151.1934162697085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "eaf5d4b14ebeae84df661e1f6d593259abac83d4",
          "name" : "Harvest Buffet",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 2160,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/117851866717561131056/photos\"\u003eAlexandre Tchin\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAA7dZFnPgaAQ5J-Oio1j_EWSrbXaLexbcJ_SznJtO7cBOr-_XbnSZrLEnsj9rRjgwCzMRKDklxmFau24KQRqOlJhhcUSlmYmbHE_HVT6LLh30Jz-Q0wYURZ5PhyVRjhq4fEhDaH0g8Lx5u-C0B1e8YU3Z8GhTbhV-9oEK0SgpCIla98BwbWJ9GEQ",
              "width" : 3840
            }
          ],
          "place_id" : "ChIJ1-v38TauEmsRCk28fG54adI",
          "rating" : 3.6,
          "reference" : "CmRSAAAAxzuerj6kx6JBKDsxN-GbPhgd0VA-req55g_fj3H0Rq9O9FXXi9zA9AJdIoQbLwkwGS_fPlOhosenO2yU-eP9DALaxQ-9hEdlFMlxi4qd2_9UGCVd5yh_OnJ5wEa4hRYEEhBitjq7nDW0VIEcpm2lI7-rGhT9epWDlH8WN8E9ZHZ7y9bkNPn_aQ",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "The Star, 80 Pyrmont Street, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.8680279,
              "lng" : 151.195857
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8669613697085,
                "lng" : 151.1965416
              },
              "southwest" : {
                "lat" : -33.8696593302915,
                "lng" : 151.1938032
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "08c0f74375ca1956d8ae2919512171adcd8266d7",
          "name" : "Balla",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 2882,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/100901649987363776394/photos\"\u003eCynthia Chia\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAA4yenjlDR4Ks8-ZgoAY_DLugd8vLejWmbHZATeOmGuoFQ75P_GzjxO3nIvNC4OCngit8VACsU_dGQZ5rhNV4-8K4AT5CHOFTYiS_ZXUiV9BgBDfMy8uWC9e87McDwss18EhBBZ1IflAhZZZtSTcULz3W8GhSf0wUP8oUcHTwgGe-szivrxYOgbQ",
              "width" : 3843
            }
          ],
          "place_id" : "ChIJ1-v38TauEmsRFBHuvMmwNyA",
          "price_level" : 3,
          "rating" : 3.7,
          "reference" : "CmRRAAAAXeIPxGbmDhFrKwwB0mzbDYNwFf3H2vKZw1eolPmHnLMYdgPlZxcsWFnb93UMcgQ3dYMnn1RCEfAGyhwDX0Ww_NQbsJD4TChE9yX0g7gRmznBlSsXN-YKAvour8ki_teaEhA2gz_oYQ-DWx7OaRRmlhblGhQ9cnFjv1x92y7QP7vXXafxTcfXxQ",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "The Star, G, 80 Pyrmont Street, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.8713517,
              "lng" : 151.1947299
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8699706697085,
                "lng" : 151.1961549802915
              },
              "southwest" : {
                "lat" : -33.87266863029149,
                "lng" : 151.1934570197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
          "id" : "de83be768d5a7f2a24e825414d5818ae407eb59d",
          "name" : "The Dunkirk Hotel",
          "photos" : [
            {
              "height" : 543,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/100619007458021702675/photos\"\u003eThe Dunkirk Hotel\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAALFgkUSiSMQqtgPB5urljK5VAbQUhXqJKvvd57SXZYMG74-kLCPjmDs6hHpFfGWWRE01ei0SGYZjN6DKshZs88ZHai6jRMj2_2_vcxnZ_102lZo7e4kwypveVaDI9HX6NEhDYgpYbQymaOwvg7FrVHiW6GhRryfLJT4SfFu18UcGyyxzdQnMYbA",
              "width" : 1024
            }
          ],
          "place_id" : "ChIJ4UEnPTGuEmsRkjpDW7FRSko",
          "rating" : 4.2,
          "reference" : "CmRRAAAAg7HBVCC8TPHXA88fwSY7vmi2apiO-2NBhIiMdCwCOCVXc2BgokxbkvBnsmitHpEQYKyUj_rylt2KEz0bwyTMTuToqeQig6APpWYge_AbbHaWlDA-2ZHzxQmkvZnRrs_gEhCoXph6eBLhbRwrNcL78B_GGhQUTrRgvxj5D7pmy-nfudWpl7l17A",
          "scope" : "GOOGLE",
          "types" : [
            "liquor_store",
            "bar",
            "store",
            "lodging",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
          ],
          "vicinity" : "205 Harris Street, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.8645362,
              "lng" : 151.1937558
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8631872197085,
                "lng" : 151.1951047802915
              },
              "southwest" : {
                "lat" : -33.8658851802915,
                "lng" : 151.1924068197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "9f29a52590d9810949f3c291d3084f328525642b",
          "name" : "The Persian Room",
          "photos" : [
            {
              "height" : 1536,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/113525072039478416731/photos\"\u003eKevin Bk Truong\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAA3P3S4CMqlAfZ3XVFyrgxk4uvhpqo4GEok00zOnc-Z99bDAVs5OCSWNiXOvS4H6rblxWi51KwvyPJUYQw79LLh7V1YIJBKBrstToHJoyFNJOTJahoFB-Nvf5MimLGPBdIEhAAQwa8J1s2L8wTz9hpHNlzGhRdAzPwuEjdYB1x-XNSP8n24kCnhA",
              "width" : 2048
            }
          ],
          "place_id" : "ChIJBSgG1DWuEmsRXhhg9gTsLVw",
          "price_level" : 2,
          "rating" : 3.1,
          "reference" : "CmRRAAAANUD0N9r8bpCkrbSxcuhRtYA2YK-3xHnR5BwTNK8hf3hWpcPXhMGXaLWyQhjWH4HMWhwBW-_3RA3W3xF5hHh6kcCQmLrqOIh-XrnXHq7OBc6Gy7JxgCa8mqvv05sHRBD_EhBrax2Z79z4CFigRMoGqqiKGhShMH73PSAQxu0zh-PTsmDCFp0tyQ",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "26 Pirrama Road,Pier 19 – 21, 120-122 Jones Bay Wharf, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.8677499,
              "lng" : 151.1956285
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8666730697085,
                "lng" : 151.1963177802915
              },
              "southwest" : {
                "lat" : -33.8693710302915,
                "lng" : 151.1936198197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "e188acf29a29bc46f1cf844c0bf78f8b1464bd6f",
          "name" : "BLACK Bar & Grill",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 3024,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/109622586320429193240/photos\"\u003e健牌\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAABxS66HtSt4ylB2c6oYFORyC-n_d_L8q1AQNJRuyUdqB64M0hpkTBAfGqXyFAPJzduMHy3qFbgDotr6rcLBHxLtcqxWB5jaqKLaRHVuO0n0-A7VVlH1HZN-PoHH_XMpz3EhCFrYHY94T1HXGKw1RQGy8ZGhRvLRfb6v4zUTy56so7tBHKjGUYxw",
              "width" : 4032
            }
          ],
          "place_id" : "ChIJ9ZCzFzGuEmsR_EwB_qra-W4",
          "rating" : 4.2,
          "reference" : "CmRRAAAA24MjR9omUpwacqDBTYOo03MtHpHYYAjgtLpaBTW-0FSGlqRt9ozQYyHNhuFPJk0J2dqLGcD1n04gIEL00XcVYQimtje2wYzys8Cm-QaKXTaK32lEjQ0AmgKVBrwr4dLPEhD66MT0X4y8O7ROsVOHx1JfGhR9URxxSHzbYFNdvPdGc49uwQT34w",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "bar", "food", "point_of_interest", "establishment" ],
          "vicinity" : "G, 80 Pyrmont Street, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.86822149999999,
              "lng" : 151.1953757
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.8670561697085,
                "lng" : 151.1962795302915
              },
              "southwest" : {
                "lat" : -33.8697541302915,
                "lng" : 151.1935815697085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
          "id" : "882abf952e4d0e6dd96294459abe076c90c127dd",
          "name" : "24/7 Sports Bar",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 638,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/110708522016398060959/photos\"\u003e24/7 Sports Bar\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAANtbcq2sM-gX--XZPK-G_HBqbXfyvabtzT1gbJRc8Tw-7v33AHb5r5chtPG9lEvlaXEhe-az3vdXjcFqBoXVm4sGzBrU36W3F886ez52mZhGF0thCVTnBqsqoGxWRqVVGEhAjbiJstA8CUF3AIkESy1-xGhTck9CP-KB2zwNBd-TeDG6kQRRXYA",
              "width" : 960
            }
          ],
          "place_id" : "ChIJ77Cd7TauEmsRBV42CMtSans",
          "rating" : 3.4,
          "reference" : "CmRRAAAAoViWdLrlRWBp0ZkQW5jrv7lZawdsVvOASYKcqnrYB9eTNEcrBFMEMYfxCi22_f7fyYbU112IIY-MQG0gEK5w0YLadaJSYFgBVNXD5APmQ6FWbZTl0GnWuDW3xxPRtO9uEhDENMX30oNixwDrYskSTRI9GhThMeKt9LsMtbp51v7md0ap-1PM1Q",
          "scope" : "GOOGLE",
          "types" : [ "bar", "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "80 Pyrmont Street, Pyrmont"
        },
        {
          "geometry" : {
            "location" : {
              "lat" : -33.868028,
              "lng" : 151.19521
            },
            "viewport" : {
              "northeast" : {
                "lat" : -33.86667901970849,
                "lng" : 151.1965589802915
              },
              "southwest" : {
                "lat" : -33.86937698029149,
                "lng" : 151.1938610197085
              }
            }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id" : "ba9494fbebdb7e40f9a646aab93379212763195c",
          "name" : "Fat Noodle",
          "opening_hours" : {
            "open_now" : true,
            "weekday_text" : []
          },
          "photos" : [
            {
              "height" : 960,
              "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/109622586320429193240/photos\"\u003e健牌\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAAH8-hkDlse-nTrAJGfhu3vFDIuzfmF6XnhWG8hOSpcnHVGoj6T71ZsAbOGh3HA8AWBdkg1ekusC6MakfhhEpcoHb1sTvzl5uD5HOlkr0CN2NB_pwlktowO_uYEfuW4-RyEhCr-U-Vhb09BA6kf7Qx8MCuGhR4Gdo0SaNr7mmo8vv6Aqg_SipEuA",
              "width" : 1280
            }
          ],
          "place_id" : "ChIJ1-v38TauEmsROWultgmCYW0",
          "price_level" : 1,
          "rating" : 3,
          "reference" : "CmRRAAAAgOR_tJw4vdIuM8YrzbeeswcmFqkcbYgUwXPzw4fivM4cnpThYsC8i_GNpu9VTX1wh765rH7_aANOPa4THEHr3JdDPrqBIr0Y2sib4xkPAkptUAwcl40SnPybsxZ0C4HoEhCuT_-DKVFizsqcrsLxjGL8GhQlcOxereimGSeEpgJxRzjghBFbcQ",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "vicinity" : "The Star, 80 Pyrmont Street, Pyrmont"
        }
      ],
      "status" : "OK"
    })
  })
}

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
