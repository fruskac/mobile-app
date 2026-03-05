# Transition Plan: RN 0.64.4 -> RN 0.68.7

## Goal
Stabilno podici aplikaciju sa React Native `0.64.4` na `0.68.7` bez regresije u navigaciji, dizajnu i kljucnim ekranima (`Home`, `Map`, `Locations`, `Location`).

## Current Stable Baseline
- Branch: `upgrade/rn-0.64.4-safe`
- Android: native Mapbox radi + klik na marker prikazuje naziv lokacije.
- iOS: in-app Web map fallback radi sa custom ikonicama + naziv lokacije na klik.
- Start/build skripte su stabilizovane (`start:stable`, `ios:stable`, `android:stable`).

## Upgrade Strategy
1. **Freeze baseline**
- Tagovati trenutno stanje (predlog: `rn-0.64.4-stable-final`).
- Sacuvati screenshot set i smoke test listu.

2. **Prepare branch**
- Nova grana: `upgrade/rn-0.68.7`.
- Ostaviti Metro/start skripte, ali ukloniti workarounde koji nisu potrebni posle upgrade-a.

3. **Core RN upgrade**
- Upgrade `react-native` na `0.68.7` i uskladiti `react`, babel, metro, jest.
- Pokrenuti `pod install` i uskladiti iOS deployment target / Xcode build settings.
- Uskladiti Android Gradle plugin + Gradle wrapper + Kotlin prema RN 0.68 zahtevima.

4. **Dependency alignment**
- Zameniti/upgrade-ovati zastarele biblioteke:
  - `react-navigation@1` (planirati prelaz na moderni stack u posebnoj fazi ili adapter sloj).
  - `react-native-i18n` -> `react-native-localize` + i18n wrapper (ako ne radi pouzdano na 0.68).
  - proveriti `@react-native-community/*` pakete i podici na kompatibilne verzije.
- Mapa:
  - Zadrzati postojeci Android native + iOS web fallback kao privremeno stabilno resenje.
  - Opcionalno u sledecoj iteraciji migrirati na jedinstveni provider (MapLibre/React Native Maps).

5. **Code/API fixes**
- Proci sve breaking changes iz RN 0.65-0.68:
  - NativeModule linking razlike,
  - permission API promene,
  - Hermes/JSC konfiguracija,
  - build script faze i `NODE_BINARY`.

6. **Stability pass**
- Smoke test matrica (iOS + Android):
  - App launch
  - Home render
  - Menu navigacija
  - Map render + klik marker -> naziv
  - Locations -> Location detail
  - Language switch
  - Offline/basic error handling

7. **Release gate**
- Kriterijum: 0 crash pri launchu, 0 blank screen, 0 broken route na glavnim ekranima.
- Tag: `rn-0.68.7-stable`.

## Risks and Mitigations
- **Legacy Mapbox iOS binary nekompatibilan sa simulatorom**
  - Mitigacija: iOS Web fallback ostaje obavezan dok se ne uradi migracija map provider-a.
- **Stari navigation stack (`react-navigation@1`)**
  - Mitigacija: ne dirati strukturu ruta u prvom prolazu; refaktor tek nakon stabilnog builda.
- **Gradle/Kotlin mismatch**
  - Mitigacija: pratiti RN 0.68 template verzije 1:1 pre custom izmena.

## Definition of Done (Next Version)
- RN `0.68.7` build prolazi na oba sistema (`ios:stable`, `android:stable`).
- Vizuelni izgled i navigacija ostaju isti kao na trenutnoj stabilnoj verziji.
- Mapa radi na oba sistema (Android native, iOS in-app fallback), klik na marker pokazuje naziv lokacije.
