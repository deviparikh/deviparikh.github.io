---
layout: pub
urltitle: "Devi Parikh - Art"
title: "Devi Parikh - Art"
categories: Devi Parikh, Art
favicon: static/img/art/origami.png
permalink: /origami
---

# Origami

<div class = 'art'>
  {% for person in site.data.art.origami %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'origami'></a>
  </div>
  {% endfor %}
</div>