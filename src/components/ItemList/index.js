// @flow
import { connect } from "react-redux";
import ItemList from "./ItemList";
import { getLanguage } from "../../selectors/settings";
import { onNavigate } from "../../actions/navigation";

const mapDispatchToProps = { onNavigate };
const mapStateToProps = state => ({ 
    language: 
      state.settings.language == "en"
        ? "en"
        : "rs"
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
