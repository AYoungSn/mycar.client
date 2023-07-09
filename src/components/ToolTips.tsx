import Tool from './styled/Tool';
import { FlexUl } from './styled/Flex';
import { Tooltips } from '../type/ApiResponseType';

type Props = {
  tooltips: Tooltips;
  engineId: number;
  onChangeEngineId: any;
  gearboxId: number;
  onChangeGearboxId: any;
  drivingId: number;
  onChangeDrivingId: any;
};

function ToolTips({ tooltips, ...props }: Props) {
  const engines = tooltips.engines;
  const gearbox = tooltips.gearbox;
  const driving = tooltips.driving;
  return (
    <section>
      <FlexUl>
        {engines?.length > 0 && (
          <Tool
            tools={engines}
            name="엔진"
            onChange={(id: number) => {
              props.onChangeEngineId(id);
            }}
            toolId={props.engineId}
          />
        )}
        {gearbox?.length > 0 && (
          <Tool
            tools={gearbox}
            name="변속기"
            onChange={(id: number) => {
              props.onChangeGearboxId(id);
            }}
            toolId={props.gearboxId}
          />
        )}
        {driving?.length > 0 && (
          <Tool
            tools={driving}
            name="구동방식"
            onChange={(id: number) => {
              props.onChangeDrivingId(id);
            }}
            toolId={props.drivingId}
          />
        )}
      </FlexUl>
    </section>
  );
}

export default ToolTips;
