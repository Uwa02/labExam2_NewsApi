
$(document).ready(function() {
    const apiKey = '6354027e9c5640aebfe6c50ea00c5a50';
    let page = 1;
    let currentSearch = '';
    let selectedCategory = '';
    let selectedCountry = '';
  
    const fetchNews = async () => {
      let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&page=${page}`;
      if (currentSearch) {
        url += `&q=${encodeURIComponent(currentSearch)}`;
      }
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      if (selectedCountry) {
        url += `&country=${selectedCountry}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
  
    const displayNews = (articles) => {
      const newsContainer = $('#newsContainer');
      newsContainer.empty(); 
      articles.forEach(article => {
        const imgSrc = article.urlToImage ? article.urlToImage : 'assets/stockNews.jpg';
        const altText = article.urlToImage ? article.title : 'Stock News Image';
        const card = `
          <div class="col-md-4">
            <div class="card bg-dark text-light">
              <img src="${imgSrc}" 
                   class="card-img-top" 
                   alt="${altText}"
                   onerror="this.onerror=null;this.src='assets/stockNews.png';this.alt='Stock News Image';">
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                ${article.description ? `<p class="card-text">${article.description}</p>` : ''}
                <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
        `;
        newsContainer.append(card);
      });
      page++;
    };
  
    fetchNews();
  
    $('#loadNewsBtn').on('click', fetchNews);
  
    $('#searchBtn').on('click', function() {
      currentSearch = $('#searchInput').val().trim();
      if (currentSearch !== '') {
        page = 1;
        fetchNews();
      }
    });
  
  
    $('#searchInput').keypress(function(event){
      const keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){ 
        $('#searchBtn').click();
      }
    });
  
    $('#categoryFilter').change(function() {
      selectedCategory = $(this).val();
      page = 1; 
      fetchNews();
    });
  
    $('#countryFilter').change(function() {
      selectedCountry = $(this).val();
      page = 1; 
      fetchNews();
    });
  });
  