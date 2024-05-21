---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/stringdoll.png
permalink: /stringdoll
---

# String Doll

<div class = 'art'>
  {% for person in site.data.art.stringdoll %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'string doll'></a>
  </div>
  {% endfor %}
</div>