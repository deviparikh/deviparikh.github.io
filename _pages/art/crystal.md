---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/crystal.png
permalink: /crystal
---

# Crystal

<div class = 'art'>
  {% for person in site.data.art.cyrstal %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'crystal'></a>
  </div>
  {% endfor %}
</div>