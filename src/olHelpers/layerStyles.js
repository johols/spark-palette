import style_Style from 'ol/style/Style';
import style_Icon from 'ol/style/Icon';
import icon_position from '../images/dot.png';

const cache = {};

export function markerStyle(feature, scale){
  //nästa steg: kolla url , key... if-satsen spärrar ändring av style?
  const url = feature.get('url');
  const key = scale + url;
  if(!cache[key]){
    cache[key] = new style_Style({
      image: new style_Icon({
        src: icon_position,
        color: '#2d6b22',
        anchor: [0.5, 0.5],
        scale: scale
      })
    });
  }
  return cache[key];
}

export function chargerStyle(feature){
  return [markerStyle(feature, 1.1)];
}

export function selectedStyle(feature){
  return [markerStyle(feature, 0.3)];
}