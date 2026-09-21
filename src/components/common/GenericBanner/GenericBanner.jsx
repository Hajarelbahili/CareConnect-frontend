import "./GenericBanner.css";
import { ClipboardList } from "lucide-react";
import Breadcrumb from "../../ui/DepartmentBreadcrumb/Breadcrumb";
const GenericBanner = ({
  badge,
  title,
  highlightedTitle,
  description,
  image,
  cards = [],
  label,
  path
}) => {
  return (
    <section className="generic-banner">
      <div className="generic-banner__visual">
        <div className="department-hero__breadcrumb">
          <Breadcrumb
            items={[
              {
                label,
                path
              }
            ]}
          />
        </div>
        <img src={image} alt="" className="generic-banner__image" />

        {cards.map((card, index) => (
          <div
            key={index}
            className={`generic-banner__card generic-banner__card--${card.position}`}
          >
            <div className="generic-banner__card-icon">
              {card.icon || <ClipboardList size={22} />}
            </div>

            <span>{card.label}</span>
          </div>
        ))}
      </div>

      <div className="generic-banner__content">
        {badge && <span className="generic-banner__badge">{badge}</span>}

        <h1 className="generic-banner__title">
          {title}
          {highlightedTitle && (
            <>
              <br />
              <span>{highlightedTitle}</span>
            </>
          )}
        </h1>

        <p className="generic-banner__description">{description}</p>
      </div>
    </section>
  );
};

export default GenericBanner;
