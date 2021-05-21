from psrecord.main import monitor


monitor(3736, logfile = "./test.log", plot="./fig.png", include_children=True)