---
layout: pub
urltitle: "Devi Parikh - Art"
title: "Devi Parikh - Art"
categories: Devi Parikh, Art
favicon: static/img/art/yarn.jpeg
permalink: /yarn
---

# Macrame, Crochet, Etc.

<div class = 'art'>
  {% for person in site.data.art.yarn %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'yarn'></a>
  </div>
  {% endfor %}
</div>