import styles from './progressBar.module.scss';

type ProgressBarProps = {
    collected: number;
    goal: number;
}
export default function ProgressBar(
    {
        collected,
        goal
    }: ProgressBarProps)
{

    function percentage(){
    return (collected/goal)*100;
    }

    return (
        <div>
            <div className={styles.progressBarOutside}>
                <div className={styles.progressBarInside} style={{width: `${percentage()}%`}} />
            </div>
        </div>
    );
}