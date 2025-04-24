import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "./Statistics.scss";
import { PiPresentationChartLight   } from "react-icons/pi"; // Icona che hai già importato
import { GiAutoRepair } from "react-icons/gi";
import { LiaFileInvoiceSolid } from "react-icons/lia";

const Statistics = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // L'animazione si attiva solo una volta
    threshold: 0.5, // L'elemento deve essere almeno al 50% visibile
  });

  const statistics = [
    { icon: <PiPresentationChartLight   />, value: 1552000, text: "Utenze gestite annualmente" },
    { icon: <LiaFileInvoiceSolid />, value: 1231000, text: "Bollette emesse annualmente" },
    { icon: <GiAutoRepair />, value: 359627, text: "Contatori sostituiti" },
  ];

  return (
    <section
      id="statistic-3"
      className="statistic-section"
    >
      <div className="container_2">
        <div className="statistic-wrapper" ref={ref}>
          <div className="row">
            {statistics.map((stat, index) => (
              <div className="col" key={index}>
                <div className="statistic-block">
                  {/* Renderizza direttamente l'icona come componente React */}
                  <div className="statistic-ico">{stat.icon}</div>
                  <h3 className="statistic-number">
                    {inView && (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={3}
                        separator=","
                        prefix="+"
                      />
                    )}
                  </h3>
                  <p className="statistic-text">{stat.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
