
# EVAC - Automateable CLI Backup Tool

EVAC is an automateable CLI Backup Tool that works on the concept
that its plugins work on path conventions for backup and restore
functionalities.

It makes time-incremental backups, and is meant to be run on a
regular schedule (e.g. via systemd or as a cronjob).

EVAC assumes that there are is a specific way to create a backup.
The backup drive has to be mounted locally, and be reachable with
non-sudo write rights.

The restore functionality will ask for a `sudo` password, and only
use it to restore configurations outside the `$HOME` folder of the
current user.


## CLI Usage

```bash
# Show Help
evac help;

# Backup everything
evac backup /path/to/backup/drive;

# Backup only specific profile folders
evac backup --plugins="firefox,thunderbird" /path/to/backup/drive;

# Restore everything
evac restore /path/to/backup/drive;
```


## GUI Usage

```bash
# Spawns Electron UI
evac gui;
```


## License

[EVAC](/evac) is licensed under [GNU GPL 3](./LICENSE_GPL3.txt).

`(c) 2021-2022 Cookie Engineer`

