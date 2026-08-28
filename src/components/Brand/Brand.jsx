import Alfa from '../../assets/images/brands/alfa.png';
import Como from '../../assets/images/brands/COMO ACQUA.png';
import Murgia from '../../assets/images/brands/images.png';
import Cadf from '../../assets/images/brands/logo_cadf.png';
import Aqp from '../../assets/images/brands/logo-AQP.png';
import dueI from '../../assets/images/brands/press-kit-logo-blu.png';
import Amag from '../../assets/images/brands/s011-1.png';
import './Brand.scss';

export default () => {
    return (
        <div className="brand-slider">
            <div className="slider">
                <div className="slide-track">
                    {/* Loghi */}
                    <div className="slide">
                        <a href="https://www.alfavarese.it/" target="_blank" rel="noopener noreferrer">
                            <img src={Alfa} alt="Alfa" />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="https://comoacqua.it/" target="_blank" rel="noopener noreferrer">
                            <img src={Como} alt="Como" />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="http://www.murgiaretigas.it/" target="_blank" rel="noopener noreferrer">
                            <img src={Murgia} alt="Murgia" />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="https://www.cadf.it/" target="_blank" rel="noopener noreferrer">
                            <img src={Cadf} alt="Cadf" />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="https://www.aqp.it/" target="_blank" rel="noopener noreferrer">
                            <img src={Aqp} alt="Aqp" />
                        </a>
                    </div>
                    <div className="slide">
                        <a
                            href="https://www.gruppocap.it/it"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="https://www.gruppocap.it/content/experience-fragments/groupcap/it/it/site/cap-header/master/_jcr_content/root/responsivegrid/headercontainer/headernavbarcontaine/headerlogocontainer/logo-header-footer2.coreimg.svg/1762185863577/cap-2025-payoff-rgb-blu.svg"
                                alt="Gruppo CAP"
                            />
                        </a>
                    </div>
                    <div className="slide">
                        <a
                            href="https://www.acquanovaravco.eu/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="https://www.acquanovaravco.eu/Content/LOGO1.png"
                                alt="Acqua Novara.VCO"
                            />
                        </a>
                    </div>
                    <div className="slide">
                        <a
                            href="https://www.abc.napoli.it/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="https://www.abc.napoli.it/images/ABC_LOGO_140ANNI-01_trasp_-_100.png"
                                alt="ABC Napoli"
                            />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="https://2iretegas.it/" target="_blank" rel="noopener noreferrer">
                            <img src={dueI} alt="dueI" />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="https://www.gruppoamag.it/" target="_blank" rel="noopener noreferrer">
                            <img src={Amag} alt="Amag" />
                        </a>
                    </div>
                    {/* Duplicazione per continuità del carosello */}
                    <div className="slide">
                        <a href="https://www.alfavarese.it/" target="_blank" rel="noopener noreferrer">
                            <img src={Alfa} alt="Alfa" />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="https://comoacqua.it/" target="_blank" rel="noopener noreferrer">
                            <img src={Como} alt="Como" />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="http://www.murgiaretigas.it/" target="_blank" rel="noopener noreferrer">
                            <img src={Murgia} alt="Murgia" />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="https://www.cadf.it/" target="_blank" rel="noopener noreferrer">
                            <img src={Cadf} alt="Cadf" />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="https://www.aqp.it/" target="_blank" rel="noopener noreferrer">
                            <img src={Aqp} alt="Aqp" />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="https://2iretegas.it/" target="_blank" rel="noopener noreferrer">
                            <img src={dueI} alt="dueI" />
                        </a>
                    </div>
                    <div className="slide">
                        <a href="https://www.gruppoamag.it/" target="_blank" rel="noopener noreferrer">
                            <img src={Amag} alt="Amag" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
