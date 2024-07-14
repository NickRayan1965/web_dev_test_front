import { Badge } from 'primereact/badge';
import { ScrollPanel } from 'primereact/scrollpanel';
import PropTypes from 'prop-types';
export default function PanelCategories({ categories }) {
  return (
    <ScrollPanel className="panel-categories">
      {categories.map((category, index) => (
        <Badge key={index} value={category} className='category'></Badge>
      ))}
    </ScrollPanel>
  );
}
PanelCategories.propTypes = {
  categories: PropTypes.array.isRequired,
};
