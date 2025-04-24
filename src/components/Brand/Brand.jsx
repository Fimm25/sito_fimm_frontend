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
