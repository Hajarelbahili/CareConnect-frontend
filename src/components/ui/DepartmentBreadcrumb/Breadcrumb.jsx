import { ChevronRight, House } from "lucide-react";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/" className="breadcrumb__home">
        <House className="breadcrumb__home-icon" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div className="breadcrumb__item" key={`${item.label}-${index}`}>
            <ChevronRight className="breadcrumb__separator" />

            {isLast || !item.path ? (
              <span className="breadcrumb__current">{item.label}</span>
            ) : (
              <Link to={item.path}>{item.label}</Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
