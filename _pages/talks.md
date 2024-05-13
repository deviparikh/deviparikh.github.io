---
layout: pub
urltitle: "Devi Parikh - Talks"
title: "Devi Parikh - Talks"
favicon: static/img/deviparikh.png
permalink: /talks
---

(Not updated since 2021)

# Selected Talks
  <div class = 'row flex'>
    <!-- Loop through talks -->
    {% for item in site.data.talks %}
      <div class = 'col-sm-7 col-md-7 flex-center'>
        <p> 
          {% for s in item.description %}
            {{ s }}<br>
          {% endfor %}
          <a href = "{{ item.link }}"> [Watch] </a>
      </p>
      </div>
      <div class = 'col-sm-5 col-md-5'>
        {% if item.thumb %}
        <div class = 'talks'>
          <a href = "{{ item.link }}">
            <img src = 'static/img/talks/{{ item.thumb }}' width="320" alt = 'thumb' />
          </a>
        </div>
        {% elsif item.video %}
          <div class = 'video__embed flex-center'>
            <iframe id="ytplayer" type="text/html" width="320" height="240" src="https://www.youtube.com/embed/{{ item.video }}?&rel=0" frameborder="0"></iframe>
          </div>
        {% endif %}
      </div>
      <hr class="talks"/>
    {% endfor %}
  </div>