import { createSelector } from "reselect";

const _getLocations = state =>
  state.locations["locations_" + state.settings.language];

const _getLocationsAll = state =>
  state.locations[`locations_${state.settings.language}`]
    .concat(state.locations["places_" + (state.settings.language == 'en' ? 'en' : 'rs')])
    .concat(state.locations["tourism_" + (state.settings.language == 'en' ? 'en' : 'rs')]);
  

const _getMapLocationsAll = state =>
  state.locations["map_" + (state.settings.language == 'en' ? 'en' : 'rs')];
  
const _getId = (state, props) => props.navigation.state.params.id;

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
  [_getMapLocationsAll, _getId],
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

const _getTracks = (state, props) => props.screenProps.language === 'en' ? 
  state.tracks['tracks_en'] : state.tracks['tracks_rs'];

export const getTracksByCategoryName = createSelector(
  [_getTracks, _getCategoryName],
  (tracks, categoryName) => {
    debugger
    return tracks.filter(track => track.track_category.toLowerCase() === categoryName.toLowerCase())
  }
    
);

export const getTrackSingle = createSelector(
  [_getTracks, _getId],
  (tracks, trackId) =>
    tracks
      .slice(0)
      .filter(item => item.id === trackId)[0]
);

const _getInfos = state => 
  [
    {
    title: "O nama",
    type: "about",
    id: "9",
    link: "https://fruskac.net/rs/o-nama",
    description: "Fruškać je nezavisno, dobrovoljno, nevladino i neprofitno udruženje pokrenuto samoinicijativom entuzijasta i zaljubljenika u prirodu.",
    image: "https://fruskac.net/sites/default/files/about/o-nama.png",
    description_long: "<p>Fruškać, odnosno <b>fruskac.net</b> je onlajn vodič kroz Nacionalni park Fruška gora nastao sa ciljem očuvanja njegovih kulturnih, istorijskih i prirodnih vrednosti. Osnovan 2015. godine, Fruškać je nezavisno, dobrovoljno, nevladino i neprofitno udruženje pokrenuto samoinicijativom entuzijasta i zaljubljenika u prirodu. Portal je napravljen isključivo doprinosom i veštinama zaljubljenika u prirodu.</p> <h2>Osnovni ciljevi portala</h2> <ul><li>Očuvanje prirodnog i kulturnog nasleđa</li> <li>Ekologija i zaštita životne sredine</li> <li>Podizanje svesti građana o Fruškoj gori</li> <li>Promovisanje eko i seoskog turizma i potencijala Fruške gore</li> <li>Promovisanje organske hrane</li> <li>Promovisanje čistih i obnovljivih izvora energije</li> <li>Promovisanje pozitivnog stava i dobrih ideja</li> </ul><div class='expand'> <h2>Simbolika logotipa</h2> <ol><li>Različitost, odnosno multijezičnost i multikulturalnost</li> <li>Šume i lišće</li> <li>Životinje (ptica)</li> <li>Vode (potoci i jezera)</li> <li>Slogan: „Fruškać volem” (lokalizam – Srem) <ol><li>Licidersko srce – ljubav</li> <li>Staza zdravlja – oznake</li> </ol></li> </ol><p><img alt='Fruškać logo objašnjenje' src='/sites/default/files/fruska-gora/fruskac-logo-objasnjenje.png' style='height:296px; width:684px' /></p> </div> <div class='expand'> <h2>Oglasni prostor</h2> <p><b>Fruskac.net</b> je neprofitni portal i cilj nam je da promovišemo dobre ideje, odgovorne organizacije, kreativne pojedince, pomognemo ljudima kojima je to zaista potrebno, stoga sav svoj oglasni prostor iznajmljujemo u te svrhe.</p> </div> <div class='expand'> <h2>Donacije</h2> <p>Portal nema spoljne izvore finansiranja. Podrška građana i ljudi koji dele naše vrednosti nam je najvažnija. Ako vam se dopada ovaj projekat i želite da živi, možete ga podržati uplatama na:</p> <ul><li>Paypal: <a href='mailto:donation@fruskac.net'>donation@fruskac.net</a></li> </ul><p>Vaše donacije će biti upotrebljene za dalji razvoj portala i ideja iza kojih stojimo. Naravno, možete nas podržati i na druge načine!</p> <p>Hvala, Vaš fruskac.net tim &lt;3</p> </div> <!--<div class='expand'><h2>Podaci udruženja</h2><p>(Ovde idu podaci o registraciji udruženja)</p></div> -->"
    },
    {
    title: "Fruška gora",
    type: "fruska_gora",
    id: "10",
    link: "https://fruskac.net/rs/fruska-gora",
    description: "Nekadašnje ostrvo Panonskog mora, pripada ostrvskim, starim gromadnim planinama. Pružajući se u pravcu zapad–istok...",
    image: "https://fruskac.net/sites/default/files/fruska-gora/fruska-gora-suma.jpg",
    description_long: "<p>Fruška gora, nekadašnje ostrvo Panonskog mora, pripada ostrvskim, starim gromadnim planinama. Pružajući se u pravcu zapad–istok, dužine oko 80 kilometara i širine 15 kilometara, sa najvišim vrhom od 539 metara – Crvenim čotom, Fruška gora predstavlja dominantnu orografsku celinu Panonske nizije. Fruškogorski planinski venac s istoka i severa ograničavaju aluvijalne ravni Save i Dunava, a sa juga i zapada sremske lesne zaravni.</p> <p>Rimljani su je nazivali Alma Mons, što znači „plodna gora”, a današnji naziv potiče od starog slovenskog etnonima Frug, sinonima za Franke, što imenu daje značenje „planina Franaka”. Zbog burne geološke prošlosti, pravoj riznici fosilne flore i faune u svojim sedimentima, mnogobrojnim retkim predstavnicima biljnog i životinjskog sveta koji obitavaju na ovom području, kao i neprocenjivoj kulturno-istorijskoj baštini, Fruška gora je još 1960. proglašena nacionalnim parkom prirode.</p> <div class='expand'> <h2>Geologija</h2> <p><img alt='Fruška gora - geologija, sedimentacija' src='/sites/default/files/fruska-gora/fruska-gora-geologija.jpg' style='height:200px; width:686px' /></p> <p>Fruška gora je planina malog prostranstva i visine s odlikama brdskog, a ne planinskog reljefa. I pored toga, ova planina se odlikuje prisustvom različitih vrsta stena kako u pogledu načina i vremena postanka, tako i po hemijskom i minerološkom sastavu. Jezgro planine čine paleozojske metamorfne, magmatske stene, koje su najstarije, a najrasprostranjeniji su filiti i liskunoviti krečnjački šiljci. Mezozojske tvorevine su prisutne u manjoj meri, u vidu uskih zona male debljine, i pripadaju trijaskim crvenim i sivim peščarima i liskunovitim škriljcima, konglomeratima, brecama i drugim stenama. Najzastupljenije su sedimentne stene iz kenozoika. Periferne delove Fruške gore grade tercijalne tvorevine, predstavljene slojevima s ugljem, lajtovačkim krečnjacima, laporcima i peščarima, dok kvartne tvorevine, u vidu debelih naslaga lesa, pokrivaju najniže delove.</p> <p>Riznica geološke prošlosti, sa veoma vrednim nalazištima dobro očuvanih fosila flore i faune u sedimentima Fruške gore, daje za pravo da ovu malu planinu nazivaju „ogledalom geološke prošlosti”. Lokaliteti kao što su Čerevićki potok, usek kod manastira Grgeteg, okolina Beočina i Ledinaca predstavljaju jedinstvene slučajeve na Starom kontinentu.</p> </div> <div class='expand'> <h2>Hidrologija</h2> <p><img alt='Fruška gora - hidrologija' src='/sites/default/files/fruska-gora/fruska-gora-hidrologija.jpg' style='height:200px; width:686px' /></p> <p>Zahvaljujući prosečno velikoj količini padavina u toku godine, geološkom sastavu i velikom broju stalnih izvora, hidrografska mreža Fruške gore je veoma gusta i relativno pravilno raspoređena. Hidrografsku mrežu čine površinske vode predstavljene izvorima, vrelima, gustom rečnom mrežom, barama i veštačkim akumulacijama. Centralni deo fruškogorskog venca ima izgled pravog planinskog bila dužine od oko 40 kilometara, sa prosečnom visinom od 440–460 metara i predstavlja deo najbogatiji vodom. Zapadni deo venca, koji je u obliku zaravnjene uzvišice s izraženim kotama od oko 200 meatara, i istočni deo, čije se poslednje uzvišice nalaze na čistoj lesnoj površini, predstavljaju područja koja su znatno manje bogata u hidrografskom pogledu. Severne padine, koje gravitiraju ka Dunavu, predstavljaju razgranatu mrežu manjih vodotokova koji dostižu dužinu do 10 kilometara, obiluju dubokim dolinama u gornjim i srednjim tokovima, dok se u donjim tokovima šire gradeći uske dolinske ravni.</p> <p>Južne padine Fruškogorja odlikuju se kratkim potocima, od kojih samo izvorišta pripadaju oblasti planine, sačinjeni su od dubokih izrazitih dolina bez dolinskih ravni i u donjim tokovima gube svoj karakter zato što nadmorsku visinu fruškogorskog bila smanjuje sremska lesna zaravan. U prošlosti su se potoci u nižim delovima Srema često izlivali i plavili obradive površine, puteve i naselja i vršili snažnu eroziju zemljišta usled prolećnih obilnih padavina, a u toku leta većina njih bi presušila. S ciljem redukovanja izlivanja u proleće i navodnjavanja u letnjim mesecima, potoci su pregrađivani i na taj način izgrađene su brojne veštačke akumulacije Fruške gore.  </p> </div> <div class='expand'> <h2>Klima</h2> <p><img alt='Fruška Gora - Klima' src='/sites/default/files/fruska-gora/fruska-gora-klima.jpg' style='height:200px; width:684px' /></p> <p>Fruška gora se nalazi na granici prostiranja umerenokontinentalne i supkontinentalne klime. Različiti faktori kao što su položaj, oblik, količina padavina, dominantni vetrovi i vegetacija utiču na stvaranje specifične lokalne klime Fruškogorja. Iako Fruška gora spada u niže planine, porastom visine klima postaje vlažnija i hladnija, tako da na većim visinama poprima obeležja planinske klime sa hladnijom zimom i svežijim letom. Srednja vrednost godišnje temperature vazduha iznosi 11,2° C, sa najnižom prosečnom temperaturom u januaru –0,6° C, a najvišom u julu 21,4° C, dok stepen relativne vlažnosti vazduha iznosi 76%.</p> <p>Fruškogorje je područje sa najviše padavina u celoj Vojvodini i godišnja suma padavina proporcionalno raste sa porastom nadmorske visine, a razlika između viših delova u odnosu na podnožje iznosi 200 mm. Prosečna godišnja količina padavina na celoj teritoriji Fruške gore iznosi 670 mm. Na ovom području preovladavaju zapadni vetrovi, zatim vetrovi iz pravca zapad–jugozapad, dok su relativno česti vetrovi iz pravca jugoistok koji se najčešće javljaju u jesen, zimu i proleće, a ređe u toku leta.</p> </div> <div class='expand'> <h2>Flora</h2> <p><img alt='Fruška gora - flora' src='/sites/default/files/fruska-gora/fruska-gora-flora.jpg' style='height:200px; width:684px' /></p> <p>Zahvaljujući geografskom položaju, klimatskim uslovima i bogatoj i razgranatoj hidrografskoj mreži, Fruška gora predstavlja pravu riznicu flore koja se može porediti sa mnogo većim i višim planinama u Srbiji. Nekada je Fruška gora u celini bila šumsko područje, a šuma se prostirala na 130000 hektara. S vremenom je čovek iskrčio veliki deo šuma na Fruškoj gori, tako da danas šumsko područje obuhvata 23000 hektara, a preostale šume se uglavnom nalaze na višim i nagnutim položajima i većim delom ulaze u granice nacionalnog parka. Na iskrčenim predelima danas se nalaze livade, utrine, njive, vinogradi i voćnjaci.</p> </div> <div class='expand'> <h2>Fauna</h2> <p><img alt='' src='/sites/default/files/fruska-gora/fruska-gora-fauna.jpg' style='height:200px; width:684px' /></p> <p>U harmoniji sa bogatom florom Fruškogorja obitava zanimljivo carstvo životinja čija se populacija sastoji od velikog broja veoma retkih primeraka zaštićenih kao prirodna bogatstva Srbije. Fruškogorske šume i livade su prirodno stanište za veliki broj insekata, 280 vrsta kičmenjaka, 23 vrste vodozemaca i gmizavaca, 211 vrsta ptica i 60 vrsta sisara koji žive ovde u skladu sa zakonima prirode.</p> </div> <div class='expand'> <h2>Turizam</h2> <p><img alt='Fruška gora - turizam' src='/sites/default/files/fruska-gora/fruska-gora-turizam.jpg' style='height:200px; width:684px' /></p> <p>Geografija, priroda i istorija Fruške gore nude sadržaje za različite vidove turizma. Ako želite da provedete prijatan porodični izlet u lepom prirodnom ambijentu, na raspolaganju su vam brojna izletišta Fruškogorja. Fruškogorska jezera su već poznata mesta za sportsko-rekreativni ribolov, a čista voda i uređene obale dobar su izbor za kupače u vrelim letnjim danima. Netaknuta priroda nacionalnog parka raspolaže nizom zanimljivih destinacija za ljubitelje eko-turizma, a čist vazduh i zdravo okruženje fruškogorskih mesta su odličan preduslov za odmor na selu. Čuveni vinski put Fruške gore je nezaobilazna trasa svih ljudi koji žele uživati u kvalitetnim vinima napravljenim po porodičnim recepturama starih vinogradara ovog područja, dok prelepi Dunav zadovoljava sve apetite ljubitelja rečnog turizma.</p> </div> "
    },
    {
    title: "Podrži Fruškać",
    type: "article",
    id: "623",
    link: "https://fruskac.net/rs/novosti/podrzi-fruskac",
    description: "Dragi ljubitelji Fruškać platforme, tokom gotovo dve godine našeg postojanja uradili smo mnogo cool stvari, ispunili po neko vaše srce i stigli i da porastemo.",
    image: "https://fruskac.net/sites/default/files/thumb/articles/podrzi-fruskac.jpg",
    description_long: "<p>&lt;p&gt;Dragi ljubitelji Fruškać platforme, tokom gotovo dve godine našeg postojanja uradili smo mnogo cool stvari, ispunili po neko vaše srce i usput smo stigli i da porastemo. Porasli smo do tačke gde su volontiranje i hobi postali velika obaveza. Kako bi nastavili da punimo srca i obezbedili naš nesmetan rad, potrebna nam je vaša podrška kako bi zaposlili makar jednu osobu i pokrili svakodnevne troškove.&amp;nbsp;&lt;/p&gt;&lt;p&gt;Možda neki ne znaju, mi smo nezavisno udruženje građana, nemamo podršku države, institucija i ne prodajemo vino. ?&amp;nbsp;&lt;/p&gt;&lt;p&gt;Mali smo, snažni i spremni da istrajemo!&lt;/p&gt;&lt;p&gt;Naš minimalan &lt;a href=&quot;<a href='https://docs.google.com/a/fruskac.net/spreadsheets/d/1ugzh6nnRuLoTAhJ3BANmhl6M7TnnFl0ReD5eD8UZVP4/edit?usp=sharing&quot;'>https://docs.google.com/a/fruskac.net/spreadsheets/d/1ugzh6nnRuLoTAhJ3BA...</a> rel=&quot;nofollow&quot;&gt;godišnji budžet je preko 10,000&amp;euro;&lt;/a&gt;. Većina aktivnosti prijatelja platforme je volonterska, ali na svakodnevnom nivou potrebno je da makar jedna osoba bude zaposlena i vodi aktivnosti na društvenim mrežama i sajtu, kako bi ideja nastavila da raste i da se razvija.&lt;/p&gt;&lt;p&gt;Kako možete da nam pomognete?&lt;/p&gt;&lt;p&gt;Za početak donacijama! Kako bi vam za vašu nesebičnu pomoć dali nešto za uzvrat, pripremili smo i prigodne poklone! A možete se upisati i u &lt;a href=&quot;/rs/novosti/lista-donatora-za-2017&quot;&gt;listu donatora&lt;/a&gt;!&lt;/p&gt;&lt;p&gt;&lt;a class=&quot;zoom-img&quot; href=&quot;/sites/default/files/news/suveniri-fruskac-01.png&quot;&gt;&lt;img alt=&quot;&quot; src=&quot;/sites/default/files/news/suveniri-fruskac-01.png&quot; /&gt;&lt;/a&gt;&lt;/p&gt;&lt;p&gt;Za donacije veće od:&amp;nbsp;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;350 din - 4 bedža&lt;/li&gt;&lt;li&gt;650 din - majica&lt;/li&gt;&lt;li&gt;950 din - majica + 3 bedža po izboru + magnet za frižider&lt;/li&gt;&lt;li&gt;1,250 din - majica + vinska čaša + magnet za frižider&lt;/li&gt;&lt;li&gt;1,550 din - &amp;nbsp;majica + vinska čaša + 3 bedža po izboru + magnet za frižider&lt;/li&gt;&lt;li&gt;3,000 din - kombo po dogovoru i postajete član udruženja te stičete određene beneficije&lt;/li&gt;&lt;li&gt;Za još veće donacije hvalaaa do no neba ?&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;Za sve donacije izvršene na teritoriji Novog Sada, vaše poklone dostaviće vam naši prijatelji iz &lt;a href=&quot;<a href='http://ekokurir.rs/&quot;'>http://ekokurir.rs/&quot;</a> rel=&quot;nofollow&quot;&gt;Eko kurira&lt;/a&gt;.&lt;/p&gt;&lt;p&gt;Ukoliko se nalazite van Novog Sada, poklone ćemo vam poslati poštom, za šta ćete morati dodatno da platite i poštarinu. Potrebno je da nam ostavite vaše podatke &lt;a href=&quot;<a href='https://docs.google.com/forms/d/e/1FAIpQLSc234wF0EMurIUVkwntr6QvypQwoOzKadsOYsNDVtcY25rrtw/viewform&quot;'>https://docs.google.com/forms/d/e/1FAIpQLSc234wF0EMurIUVkwntr6QvypQwoOzK...</a> rel=&quot;nofollow&quot;&gt;putem ove forme&lt;/a&gt;, a zatim uplatite novac na naš tekući račun&amp;nbsp;&lt;strong&gt;160-429193-75&lt;/strong&gt;&amp;nbsp;ili uplatite preko&lt;strong&gt; &lt;/strong&gt;Paypal-a na &lt;strong&gt;<a href='mailto:donacije@fruskac.net'>donacije@fruskac.net</a>&lt;/strong&gt;. Možete nas podržati i preko &lt;a href=&quot;<a href='https://www.patreon.com/fruskac&quot;'>https://www.patreon.com/fruskac&quot;</a> rel=&quot;nofollow&quot;&gt;Patreon-a&lt;/a&gt;&amp;nbsp;i tu vas čeka iznaneđenje :)&lt;/p&gt;&lt;form action=&quot;<a href='https://www.paypal.com/cgi-bin/webscr&quot;'>https://www.paypal.com/cgi-bin/webscr&quot;</a> method=&quot;post&quot; target=&quot;_top&quot;&gt;&lt;input name=&quot;cmd&quot; type=&quot;hidden&quot; value=&quot;_s-xclick&quot; /&gt; &lt;input name=&quot;hosted_button_id&quot; type=&quot;hidden&quot; value=&quot;5HHRMP475ZYT8&quot; /&gt; &lt;input alt=&quot;PayPal - The safer, easier way to pay online!&quot; border=&quot;0&quot; name=&quot;submit&quot; src=&quot;<a href='https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif&quot;'>https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif&quot;</a> type=&quot;image&quot; /&gt; &lt;img alt=&quot;&quot; border=&quot;0&quot; height=&quot;1&quot; src=&quot;<a href='https://www.paypalobjects.com/en_US/i/scr/pixel.gif&quot;'>https://www.paypalobjects.com/en_US/i/scr/pixel.gif&quot;</a> width=&quot;1&quot; /&gt;&lt;/form&gt;&lt;p&gt;A firme?&lt;/p&gt;&lt;p&gt;Ukoliko želite da nam donirate veće iznose, nismo alergični na njih. Za uzvrat ćemo vam poslati nešto kao znak zahvalnosti i okačiti vas na sajt u listu donatora. Smislićemo još po nešto zanimljivo za vas, pa vam javimo. ?&lt;/p&gt;&lt;p&gt;Pranje karme?! No, no!&lt;/p&gt;&lt;p&gt;Novac od firmi koje svojim delovanjem negativno utiču na društvo ili društvenu sredinu, nećemo primati!&amp;nbsp;&lt;/p&gt;&lt;p&gt;Veliki pozdrav, Fruškać tim.&lt;/p&gt;</p> "
    },
    {
      title_en: "Contact",
      title_rs: "Kontakt",
      type: "about",
      id: "15",
      link_en: "https://fruskac.net/en/about-us/contact",
      link_rs: "https://fruskac.net/rs/o-nama/kontakt",
      description_en: "Contact us",
      description_rs: "Imate pitanja? Tu smo! ",
      image: "https://fruskac.net/sites/default/files/about/kontakt.png",
      description_long_en: "<p><a class='eml' href='#info-m-fruskac-d-net'>info-m-fruskac-d-net</a></p> ",
      description_long_rs: "<p>Imajte u vidu prilkom kontaktiranja da <strong>mi nismo Nacionalni park Fruška gora! </strong><a href='/rs/o-nama'>Više o udruženju</a>!</p> <ul><!--<li>Partnerstvo: <a class='eml' href='#partners-m-fruskac-d-net'>partners-m-fuskac-d-net</a></li><li>Nove lokacije: <a class='eml' href='#locations-m-fruskac-d-net'>locations-m-fruskac-d-net</a></li><li>Autorska prava: <a class='eml' href='#terms-m-fruskac-d-net'>terms-m-fruskac-d-net</a></li><li>Volonteri: <a class='eml' href='#volunteers-m-fruskac-d-net'>volunteers-m-fruskac-d-net</a></li><li>Mediji: <a class='eml' href='#press-m-fruskac-d-net'>press-m-fruskac-d-net</a>&nbsp;</li>--><li>Ostale informacije: <a class='eml' href='#info-m-fruskac-d-net'>info-m-fruskac-d-net</a></li> </ul>"
    }
  ];

export const getInfos = createSelector(
  [_getInfos],
  infos => infos
);

export const getInfoSingle = createSelector(
  [_getInfos, _getId],
  (infos, infoId) =>
    infos
      .slice(0)
      .filter(item => item.id === infoId)[0]
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
