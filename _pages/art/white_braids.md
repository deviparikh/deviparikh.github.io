---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/white_braids.png
permalink: /white_braids
---

# White Braids

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.white_braids %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'white braids'></a>
  </div>
  {% endfor %}
</div>