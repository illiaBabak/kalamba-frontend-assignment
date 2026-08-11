import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { resolveAvatarUrl } from "utils/avatar";
import { Article } from "utils/types";
import FavoriteButton from "components/FavoriteButton";

type ArticlePreviewProps = {
  article: Article;
};

export default function ArticlePreview({ article }: ArticlePreviewProps): JSX.Element {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`}>
          <img src={resolveAvatarUrl(article.author.image)} alt={article.author.username} />
        </Link>
        <div className="info">
          <Link to={`/profile/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">{dayjs(article.createdAt).format("MMMM D, YYYY")}</span>
        </div>
        <FavoriteButton article={article} compact />
      </div>
      <Link to={`/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        {!!article.tagList.length && (
          <ul className="tag-list">
            {article.tagList.map(tag => (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
      </Link>
    </div>
  );
}
