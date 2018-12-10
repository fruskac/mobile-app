import { createSelector } from "reselect";

const _getLocations = state =>
  state.locations["locations_" + state.settings.language];

const _getLocationsAll = state =>
  state.locations[`locations_${state.settings.language}`]
    .concat(state.locations["places_" + (state.settings.language == 'en' ? 'en' : 'rs')])
    .concat(state.locations["tourism_" + (state.settings.language == 'en' ? 'en' : 'rs')]);
  

const _getMapLocationsAll = state =>
  state.locations["map_" + (state.settings.language == 'en' ? 'en' : 'rs')];

const _getTracks = state =>
  [
    {
    title_en: "MTB - hard - Popovica I",
    title_rs: "MTB - teška - Popovica I",
    type: "tracks",
    track_category: "Hard",
    track_type: "Rides",
    track_url: "https://fruskac.net/sites/default/files/tracks/mtb-hard-popovica-1.gpx",
    place: "Sremska Kamenica",
    id: "683",
    link_en: "https://fruskac.net/en/mtb-hard-popovica-i",
    link_rs: "https://fruskac.net/rs/mtb-teska-popovica-i",
    description_en: "MTB Popovica - hard",
    description_rs: "MTB Popovica I - teška",
    image: "https://fruskac.net/",
    description_long_en: "<p>MTB Popovica - advanced</p> ",
    description_long_rs: "<p>MTB Popovica I - teška</p> "
    },
    {
    title_en: "Hiking - Easy - Stražilovo I",
    title_rs: "Šetnja - Lagana - Stražilovo I",
    type: "tracks",
    track_category: "Easy",
    track_type: "Hiking",
    track_url: "https://fruskac.net/sites/default/files/tracks/hiking-easy-strazilovo-1.gpx",
    place: "Sremski Karlovci",
    id: "720",
    link_en: "https://fruskac.net/en/hiking-easy-strazilovo-i",
    link_rs: "https://fruskac.net/rs/setnja-lagana-strazilovo-i",
    description_en: "Stražilovo I hike is a good choice for your enjoyment in nature. It is circular shaped and during walk you&#039;ll not face any significant altitude differences.",
    description_rs: "Šetnja Stražilovo I je dobar izbor za vaše rasterećeno uživanje u prirodi. Kružnog je oblika i tokom njenog obilaska nećete naići na značajnije visinske razlike",
    image: "https://fruskac.net/sites/default/files/thumb/track/setnja-lagana-strazilovo-i.jpg",
    description_long_en: "<p><strong>Stražilovo I</strong> hike is a good choice for your relaxed enjoyment in nature. It is circular shaped and during walk you will not face any significant altitude differences.</p> <p>The starting point is <a href='https://www.fruskac.net/en/locations/picnic-areas/strazilovo' rel='nofollow'>picnick area Stražilovo</a>, near the restaurant 'Brankov čardak', from where you’ll continue the route towards <a href='https://www.fruskac.net/en/locations/monuments/brankos-grave' rel='nofollow'>Branko's grave</a>. There you’ll encounter the greatest climb that you will have to cross. Its length is 1.400 m and lasts about 20 minutes. When you climb the hill, you can take a break and enjoy a beautiful view or learn some information about Branko Radičević.</p> <p>The road continues through the forest, towards the Partisan road. The distance to it is 2.7 km and about 40 minutes at a normal pace. By the way, you pass by the memorial to the victims of World War II, which is on your left. Follow the forest path and enjoy the surroundings, because forest here is very beautiful.</p> <p>When you get to the Partisan road, turn right and continue the road by driveway. Go along the edge of the road, so you don’t disturb the traffic. The path to be crossed by driveway is about 450 meters long and takes about 5 minutes.</p> <p>From driveway you turn right to the forest path and continue right. In this part, you again start to descend towards Stražilovo and Stražilovački potok. The length is 2.7 km and takes about 40 minutes. In the first part of the road you have a mild downhill and on your right you can enjoy incredible panoramic view. After that you enter the forest again, you descend downhill with a greater inclination and follow the path that looks like you are going through the course of the stream.</p> <p>When you get down you have the last test in front of you. It is ascent to the <a href='https://www.fruskac.net/en/tourism/mountain-huts/mountaineering-hut-strazilovo' rel='nofollow'>Mountaineering Hut “Stražilovo”</a>, which is 1 km long and lasts about 20 minutes. The ascent is quite sharp and will draw your last atoms of power before relaxation in a mountaineering hut.</p> ",
    description_long_rs: "<p>Šetnja <strong>Stražilovo I</strong> je dobar izbor za vaše rasterećeno uživanje u prirodi. Kružnog je oblika i tokom njenog obilaska nećete naići na značajnije visinske razlike. </p> <blockquote class='embedly-card' data-card-controls='0' data-card-key='f1631a41cb254ca5b035dc5747a5bd75'><h4><a href='https://www.relive.cc/view/1476283211?r=embed-site'>Relive 'Šetnja - Lagana - Stražilovo I'</a></h4> </blockquote> <script async='' src='//cdn.embedly.com/widgets/platform.js' charset='UTF-8'></script><p>Polazna tačka je <a href='https://fruskac.net/rs/lokacije/izletista/strazilovo' rel='nofollow'>izletište Stražilovo</a>, kod restorana „Brankov čardak”, odakle put nastavljate prema <a href='https://fruskac.net/rs/lokacije/spomenici/brankov-grob' rel='nofollow'>Brankovom grobu</a>. Ovde nailazite na najveći uspon koji ćete odjednom morati da pređete. Njegova dužina je 1.400 m i trajanje nekih 20 min. Kada se popnete na brdo, možete predahnuti uz predivan pogled ili da saznate par informacije o Branku Radičeviću.</p> <p>Put nastavljate kroz šumu, prema partizanskom putu. Razdaljina do njega je 2.7 km i oko 40 min normalnim tempom. Usput prolazite pored spomen obeležja žrtvama u II svetskom ratu, koje se nalazi sa vaše leve strane. </p> <p>Kada stignete do partizanskog puta, skrećete desno i nastavljate put po kolovozu. Idite uz ivicu puta, kako ne bi ometali saobraćaj. Potez koji treba da pređete po kolovozu je nekih 450 m i traje oko 5 min.</p> <p>Sa kolovoza skrećete desno na šumski put i nastavljate pravo. U ovom delu ponovo krećete da se spuštate prema Stražilovu i Stražilovačkom potoku. Dužine je 2.7 km i traje nekih 40 min. U prvom delu puta imate blagu nizbrdicu i sa vaše desne strane možete da uživate u panoramskom pogledu. Nakon toga ponovo ulazite u šumu, spuštate se nizbrdo pri većem nagibu i pratite put koji izgleda kao da idete kroz korito potoka. </p> <p>Kada se spustite imate pred sobom poslednji test. To je uspon do <a href='https://fruskac.net/rs/turizam/planinarski-domovi/strazilovo' rel='nofollow'>Planinarskog doma „Stražilovo”</a> koji je dužine 1 km i traje oko 20 min. Uzbrdica je prilično oštra i izvući će vaše poslednje atome snage pred opuštanje u domu, uz neko piće ili ručak.</p> "
    }
  ];
  
const _getLocationId = (state, props) => props.navigation.state.params.id;

const _getLocationFilter = state => state.locations.filter;

const _getLocationTypePlaceId = (state, props) =>
  props.navigation.state.params.id;

const _getCategoryName = (state, props) =>
  props.navigation.state.params.category;

export const getLocations = createSelector(
  [_getLocations],
  locations => locations
);

export const getLocationSingle = createSelector(
  [_getMapLocationsAll, _getLocationId],
  (locations, locationId) =>
    locations
      .slice(0)
      .filter(item => item.id === locationId)[0]
);

export const getLocationsFiltered = createSelector(
  [_getMapLocationsAll, _getLocationTypePlaceId],
  (locations, locationTypePlaceId) =>
    locations
      .filter(item => item.tag == locationTypePlaceId || item.category == locationTypePlaceId || item.place == locationTypePlaceId)
);

export const getTracksByCategoryName = createSelector(
  [_getTracks, _getCategoryName],
  (tracks, categoryName) =>
    tracks
      .filter(track => track.track_category.toLowerCase() === categoryName.toLowerCase())
);

export const getPlaceOrCategory = createSelector(
  [_getLocationsAll, _getLocationTypePlaceId],
  (locations, locationTypePlaceId) =>
    locations
      .filter(item => item.key == locationTypePlaceId || item.name == locationTypePlaceId)[0]
);

export const getLocationsForMap = createSelector(
  [_getLocations],
  locations => ({
    type: "FeatureCollection",
    features: locations.filter(l => l.tag !== "waterfalls").map(l => ({
      type: "Feature",
      id: l.data.id,
      properties: {
        icon: l.tag.replace("-", "") + "Map"
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(l.lng), parseFloat(l.lat)]
      }
    }))
  })
);
