export default class Router {
  constructor(routes) {
    this.routes = routes;

    // הוספת מאזין אירועים ל-popstate (שינוי בהיסטוריה של הדפדפן)
    // ומקשרו ל-renderRoute.
    window.addEventListener('popstate', this.renderRoute.bind(this));
  }

  renderRoute() {
    // אחזור נתיב ה-URL הנוכחי מ-location.hash, תוך הסרת '#' מוביל.
    const path = location.hash.slice(1) || '/';

    // חיפוש Route תואם ב-routes באמצעות הנתיב שחולץ.
    const route = this.routes[path] || this.routes['/404'];

    // יצירת אובייקט חדש מה-component של Route התואם.
    const componentInstance = new route.component();

    // קריאה ל-render של רכיב זה.
    // העברת params מה-Route או ערכי ברירת מחדל ל-render.
    const renderedComponent = componentInstance.render(route.params || {});

    // הזרקת הרכיב המרונדור ל-DOM באלמנט בעל ה-ID 'app'.
    document.getElementById('app').innerHTML = renderedComponent;
  }

  navigate(path) {
    // שימוש ב-window.history.pushState לשינוי ה-URL ללא רענון עמוד מלא.
    // ה-URL החדש כולל '#' ואחריו נתיב ה-Route הרצוי (לדוגמה: '#/about').
    window.history.pushState({}, '', `#${path}`);

    // לאחר עדכון ה-URL, קריאת renderRoute לרינדור הרכיב המתאים.
    this.renderRoute();
  }
}
