
# EVAC - Automateable CLI Backup Tool

EVAC is an automateable CLI Backup Tool that works on the concept
that its plugins work on path conventions for backup and restore
functionalities.

It makes time-incremental backups, and is meant to be run on a
regular schedule (e.g. via systemd or as a cronjob).


## Usage

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


## Plugins

- `music` that backs up all `mp3` files in `~/Music`.
- `software` that backs up all `git` repositories in `~/Software`.

- `chromium` that backs up important files in the Chromium profile.
- `firefox` that backs up important files in the Firefox profile.
- `thunderbird` that backs up important files in the Thunderbird profile.

- `gnupg` that backs up all GPG keys in `~/.gnupg`.
- `keepass` that backs up all keepass databases in `~`.
- `openssh` that backs up all SSH keys in `~/.ssh`.

## License

[EVAC](/evac) is licensed under [GNU GPL 3](./LICENSE_GPL3.txt).

`(c) 2021 Cookie Engineer`

