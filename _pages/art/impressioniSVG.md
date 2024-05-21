---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/impressioniSVG.png
permalink: /impressioniSVG
---

# ImpressioniSVG

Click on the image to see the texture details.

<div class = 'art'>
  {% for person in site.data.art.impressioniSVG %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'impressioniSVG'></a>
  </div>
  {% endfor %}
</div>