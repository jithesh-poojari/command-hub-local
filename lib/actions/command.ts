"use server"

import prisma from "@/lib/db";
import { CommandFormValues } from "../validation";

export async function createCommand(data: CommandFormValues) {
  await prisma.command.create({
    data: {
      usage: data.usage,
      name: data.name,
      description: data.description,
      category: data.category.type,
      package_manager: data.category.options.package_manager?.pm_type,
      framework: data.category.options.package_manager?.framework,
      version_control: data.category.options.version_control,
      containerization: data.category.options.containerization,
    },
  });
}

export async function getAllCommands() {
  const commands = await prisma.command.findMany();

  const formattedCommands = commands.map((command) => {
    const { package_manager, framework, version_control, containerization, ...rest } = command;
    const tags = [package_manager, framework, version_control, containerization].filter(Boolean);

    return { ...rest, tags };
  });

  return formattedCommands;
}

export async function getAllPackageCommands(pm_type: string) {
  const commands = await prisma.command.findMany({
    where: {
      package_manager: pm_type
    }
  });

  const formattedCommands = commands.map((command) => {
    const { package_manager, framework, version_control, containerization, ...rest } = command;
    const tags = [package_manager, framework, version_control, containerization].filter(Boolean);

    return { ...rest, tags };
  });

  return formattedCommands;
}

export async function getAllVersionCommands(vc_type: string) {
  const commands = await prisma.command.findMany({
    where: {
      version_control: vc_type
    }
  });

  const formattedCommands = commands.map((command) => {
    const { package_manager, framework, version_control, containerization, ...rest } = command;
    const tags = [package_manager, framework, version_control, containerization].filter(Boolean);

    return { ...rest, tags };
  });

  return formattedCommands;
}

export async function getAllContainerCommands(ct_type: string) {
  const commands = await prisma.command.findMany({
    where: {
      containerization: ct_type
    }
  });

  const formattedCommands = commands.map((command) => {
    const { package_manager, framework, version_control, containerization, ...rest } = command;
    const tags = [package_manager, framework, version_control, containerization].filter(Boolean);

    return { ...rest, tags };
  });

  return formattedCommands;
}

export async function getCommand(id: number) {
  const command = await prisma.command.findUnique({
    where: {
      id: id,
    },
  });

  if (!command) {
    throw new Error(`Command with id ${id} not found`);
  }

  return command;
}

export async function deleteCommand(id: number) {
  await prisma.command.delete({
    where: {
      id: id,
    }
  })
}

export async function updateCommand(id: number, data: CommandFormValues) {
  await prisma.command.update({
    where: { id: id },
    data: {
      usage: data.usage,
      name: data.name,
      description: data.description,
      category: data.category.type,
      package_manager: data.category.options.package_manager?.pm_type,
      framework: data.category.options.package_manager?.framework,
      version_control: data.category.options.version_control,
      containerization: data.category.options.containerization,
    },
  })
}

export async function getExistingPackageManager() {
  const packages = await prisma.command.groupBy({
    by: ["package_manager"],
    _count: {
      _all: true
    },
    where: {
      package_manager: {
        not: null
      }
    }
  });

  const formattedPackages = packages
    .map(entry => ({ name: entry.package_manager as string, count: entry._count._all }));

  return formattedPackages;
}

export async function getExistingVersionControl() {
  const versionControls = await prisma.command.groupBy({
    by: ["version_control"],
    _count: {
      _all: true
    },
    where: {
      version_control: {
        not: null
      }
    }
  });

  const formattedVersionControls = versionControls
    .map(entry => ({ name: entry.version_control as string, count: entry._count._all }));

  return formattedVersionControls;
}

export async function getExistingContainerization() {
  const containerization = await prisma.command.groupBy({
    by: ["containerization"],
    _count: {
      _all: true
    },
    where: {
      containerization: {
        not: null
      }
    }
  });

  const formattedContainerization = containerization
    .map(entry => ({ name: entry.containerization as string, count: entry._count._all }));

  return formattedContainerization;
}
