---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/dancing_sun.png
permalink: /dancing_sun
---

# Dancing Sun

<div class = 'art'>
  {% for person in site.data.art.dancing_sun %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'dancing sun'></a>
  </div>
  {% endfor %}
</div>