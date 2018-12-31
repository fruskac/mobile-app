// @flow

import { connect } from "react-redux";
import HeaderAd from "./HeaderAd";
import { onOpenAd, onNavigate } from "../../actions/navigation";

const mapDispatchToProps = {
  onOpenAd,
  onNavigate
};
const mapStateToProps = state => ({ 
  language: state.settings.language,
  small_add: {
    img_url: "https://fruskac.net/sites/default/files/ad/temporary-small-ad.png",
    link_url: "/info-single/10",
    internal: true
  } 
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAd);
